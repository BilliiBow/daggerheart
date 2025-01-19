# Py cript for delete duplicated images
import os
import hashlib
import argparse


def calculate_sha256(filepath):
    """Calculates the SHA256 checksum of a file."""
    try:
        hasher = hashlib.sha256()
        with open(filepath, 'rb') as file:
            while True:
                chunk = file.read(4096)  # Read in chunks for large files
                if not chunk:
                    break
                hasher.update(chunk)
        return hasher.hexdigest()
    except (IOError, OSError) as e:
        print(f"Error reading file {filepath}: {e}")
        return None


def find_duplicate_files(root_dir, delete=False):
    """Finds and optionally deletes duplicate files based on SHA256 checksum."""
    file_hashes = {}
    duplicates = []

    for dirpath, dirnames, filenames in os.walk(root_dir):
        for filename in filenames:
            filepath = os.path.join(dirpath, filename)
            file_hash = calculate_sha256(filepath)

            if file_hash is None:
                continue  # Skip files that couldn't be read

            if file_hash in file_hashes:
                duplicates.append(filepath)
                print(f"Duplicate found: {
                      filepath} (duplicate of {file_hashes[file_hash]})")
                if delete:
                    try:
                        os.remove(filepath)
                        print(f"Deleted: {filepath}")
                    except OSError as e:
                        print(f"Error deleting {filepath}: {e}")
            else:
                file_hashes[file_hash] = filepath

    return duplicates


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Find and optionally delete duplicate files based on SHA256 checksum.")
    parser.add_argument("root_dir", help="The root directory to search.")
    parser.add_argument("-d", "--delete", action="store_true",
                        help="Delete duplicate files (use with caution!)")

    args = parser.parse_args()

    if not os.path.isdir(args.root_dir):
        print(f"Error: {args.root_dir} is not a valid directory.")
        exit(1)

    print(f"Scanning directory: {args.root_dir}")
    duplicates = find_duplicate_files(args.root_dir, args.delete)

    if not duplicates:
        print("No duplicate files found.")
    elif args.delete:
        print("Duplicate file deletion process finished.")
    else:
        print(f"Found {len(duplicates)
                       } duplicate file(s). Use -d or --delete to remove them.")
