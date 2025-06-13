import os
import zipfile
import tempfile
from backend.world_parser import get_seed_from_leveldat
from backend.map_merger import generate_map

def process_zip_file(zip_path, version):
    with tempfile.TemporaryDirectory() as temp_dir:
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            zip_ref.extractall(temp_dir)

        level_dat_path = find_level_dat(temp_dir)
        if not level_dat_path:
            raise FileNotFoundError("level.dat not found in uploaded world.")

        seed = get_seed_from_leveldat(level_dat_path)
        print(f"Extracted seed: {seed}")

        output_image = generate_map(seed, version)
        return output_image

def find_level_dat(root):
    for dirpath, _, filenames in os.walk(root):
        if 'level.dat' in filenames:
            return os.path.join(dirpath, 'level.dat')
    return None
