from PIL import ImageFont, ImageDraw, Image

ICON_SIZE = 128
ICON_RADIUS = 20
BACKGROUND_COLOUR = (22, 22, 22, 255)
TEXT_COLOUR = (226, 225, 223, 255)
ICON_FONT = "fonts/RobotoSlab-Bold.ttf"

USED_CHARACTERS = ["a", "i", "v", "n", "p", "m", "b"]


def create_icon(character: str) -> Image.Image:

    # Create a new image with a transparent background.
    icon = Image.new("RGBA", (ICON_SIZE, ICON_SIZE))
    draw = ImageDraw.Draw(icon)

    # Draw a horizontal and rectangle to make a cross.
    # Horizontal
    draw.rectangle(
        [0, ICON_RADIUS, ICON_SIZE, ICON_SIZE - ICON_RADIUS],
        fill=BACKGROUND_COLOUR,
    )
    # Vertical
    draw.rectangle(
        [ICON_RADIUS, 0, ICON_SIZE - ICON_RADIUS, ICON_SIZE],
        fill=BACKGROUND_COLOUR,
    )

    # Draw the 4 circles that make up the corners.
    draw.ellipse(
        [0, 0, 2 * ICON_RADIUS, 2 * ICON_RADIUS], fill=BACKGROUND_COLOUR
    )
    draw.ellipse(
        [0, ICON_SIZE - 2 * ICON_RADIUS, 2 * ICON_RADIUS, ICON_SIZE],
        fill=BACKGROUND_COLOUR,
    )
    draw.ellipse(
        [ICON_SIZE - 2 * ICON_RADIUS, 0, ICON_SIZE, 2 * ICON_RADIUS],
        fill=BACKGROUND_COLOUR,
    )
    draw.ellipse(
        [
            ICON_SIZE - 2 * ICON_RADIUS,
            ICON_SIZE - 2 * ICON_RADIUS,
            ICON_SIZE,
            ICON_SIZE,
        ],
        fill=BACKGROUND_COLOUR,
    )

    # Change the font to the globally defined font.
    font = ImageFont.truetype(ICON_FONT, ICON_SIZE * 0.8)

    # Calculate the width and height of the text.
    text_width = draw.textlength(character, font=font)
    text_height = font.size

    # Calculate the x and y position of the text.
    text_x = (ICON_SIZE - text_width) / 2
    text_y = ((ICON_SIZE - text_height) / 2) - (0.15 * ICON_SIZE)

    # Draw the text on the icon.
    draw.text((text_x, text_y), character, font=font, fill=TEXT_COLOUR)

    # Return the icon.
    return icon


# Iterate over the numbers 0-9 and create an icon for each number.
for x in range(10):

    # Convert the number to a string.
    character = str(x)

    # Create the icon for the number.
    icon = create_icon(character)

    # Save the icon to the icons directory.
    icon.save(f"icons/icon_{x}.png")

# Iterate over the lowercase required characters and create an icon for each.
for character in USED_CHARACTERS:

    # Convert the character to uppercase.
    character_upper = character.upper()

    # Create the icon for the uppercase letter.
    icon = create_icon(character_upper)

    # Save the icon to the icons directory with the lowercase character.
    icon.save(f"icons/icon_{character}.png")
