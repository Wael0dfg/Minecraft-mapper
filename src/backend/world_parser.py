from nbt import nbt

def get_seed_from_leveldat(path):
    nbtfile = nbt.NBTFile(path, 'rb')
    if 'RandomSeed' in nbtfile:
        return nbtfile['RandomSeed'].value
    elif 'WorldGenSettings' in nbtfile and 'seed' in nbtfile['WorldGenSettings']:
        return nbtfile['WorldGenSettings']['seed'].value
    else:
        raise ValueError("Seed not found in level.dat")