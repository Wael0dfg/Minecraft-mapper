import os

def list_region_files(world_path):
    db_path = os.path.join(world_path, 'db')
    if not os.path.exists(db_path):
        raise FileNotFoundError("No db folder found in world folder")

    return [f for f in os.listdir(db_path) if os.path.isfile(os.path.join(db_path, f))]
# (Future) Use this to detect buildings or block changes.