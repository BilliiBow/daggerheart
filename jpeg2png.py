# Py script for converts JPEG images in a folder to PNG, removes pixels within a specified color range,and makes them transparent.
import os
from PIL import Image


def convert_jpeg_to_png_and_remove_color_range(folder_path, color_range=((0, 0, 0), (255, 255, 255))):
    """
    Converts JPEG images in a folder to PNG, removes pixels within a specified color range,
    and makes them transparent.

    Args:
        folder_path (str): The path to the folder containing the JPEG images.
        color_range (tuple, optional): A tuple of two tuples representing the lower and upper bounds
                                       of the color range to remove (default: black, ((0, 0, 0), (255, 255, 255))).
    """

    for filename in os.listdir(folder_path):
        if filename.lower().endswith(('.jpg', '.jpeg')):
            filepath = os.path.join(folder_path, filename)
            try:
                # Convert to RGBA for transparency
                img = Image.open(filepath).convert("RGBA")
                pixels = img.load()
                width, height = img.size

                for x in range(width):
                    for y in range(height):
                        pixel_color = pixels[x, y][:3]  # Get RGB values

                        # Check if pixel color falls within the color range
                        in_range = all(
                            lower_bound <= color <= upper_bound
                            for lower_bound, upper_bound, color in zip(color_range[0], color_range[1], pixel_color)
                        )

                        if in_range:
                            # Make transparent
                            pixels[x, y] = (255, 255, 255, 0)

                new_filename = os.path.splitext(filename)[0] + ".png"
                new_filepath = os.path.join(folder_path, new_filename)
                img.save(new_filepath, "PNG")
                os.remove(filepath)  # Remove old file
                print(f"Converted {filename} to {new_filename}")

            except OSError as e:
                print(f"Error processing {filename}: {e}")
            except Exception as e:  # Catch other potential exceptions
                print(f"An unexpected error occurred processing {
                      filename}: {e}")


# Example usage:
folder_path = input("Введите путь к папке с изображениями: ")

# Get user input for color range (optional)
color_range_str = input(
    "Введите диапазон цвета для удаления в формате RGB (нижний, верхний) "
    "(по умолчанию черный: ((0, 0, 0), (255, 255, 255))): "
)

if color_range_str:
    try:
        lower_bound, upper_bound = tuple(
            tuple(int(x) for x in color_str.split(",")) for color_str in color_range_str.split("->")
        )
        color_range = (lower_bound, upper_bound)
    except ValueError:
        print("Неверный формат ввода диапазона цвета. Используйте RGB значения разделенные запятыми.")
        color_range = ((218, 218, 218), (255, 255, 255))  # Default to black
else:
    color_range = ((218, 218, 218), (255, 255, 255))  # Default to black

convert_jpeg_to_png_and_remove_color_range(folder_path, color_range)
