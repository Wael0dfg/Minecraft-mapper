from flask import Flask, request, send_file, jsonify
from werkzeug.utils import secure_filename
import os
from upload_handler import process_zip_file

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'

@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded."}), 400

    uploaded_file = request.files['file']
    version = request.form.get('version', '1.21.60')

    if uploaded_file.filename == '' or not uploaded_file.filename.endswith('.zip'):
        return jsonify({"error": "Invalid file type. Upload a .zip file."}), 400

    filename = secure_filename(uploaded_file.filename)
    zip_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    uploaded_file.save(zip_path)

    try:
        output_image = process_zip_file(zip_path, version)
        return send_file(output_image, mimetype='image/png')
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    os.makedirs('uploads', exist_ok=True)

    # ✅ This makes Flask work with Render's public server system
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)
