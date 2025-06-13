import subprocess
import os

def generate_map(seed, version):
    output_path = os.path.join("uploads", f"map_{seed}.png")

    result = subprocess.run([
        "./src/cubiomes/cubiomes-viewer",  # Replace with your cubiomes binary if needed
        str(seed),
        "-o", output_path
    ], capture_output=True)

    if result.returncode != 0:
        raise RuntimeError(f"Cubiomes failed: {result.stderr.decode()}")

    return output_path