import os
import cloudinary
import cloudinary.uploader
from cloudinary import CloudinaryImage
from PIL import Image
from io import BytesIO
from dotenv import load_dotenv



load_dotenv()


class Img:

    cloudinary.config(
        cloud_name=os.environ.get('CLOUD_NAME'),
        api_key=os.environ.get('API_KEY'),
        api_secret=os.environ.get('API_SECRET'),
        secure=True
    )

    
    async def add_image(self, content) -> str:
        """
            Upload an image to the Cloudinary service.

        This method takes the content of an image and uploads it to the Cloudinary service.
        The Cloudinary service will generate a public URL for the uploaded image and provide
        a unique public ID for the image.

        :param content (bytes): The binary content of the image to be uploaded.

        :return: tuple[str, str]: A tuple containing the public URL and the public ID of the uploaded image.

        """
        upload_image = cloudinary.uploader.upload(content)#, transformation={
        #     "width": 100,
        #     "height": 100,
        #     "crop": "fill"  # You can adjust the cropping strategy as needed
        # })
        return upload_image['url'], upload_image['public_id']

    
    async def delete_image(self, public_id: str):
        """
                Delete an image from the Cloudinary service.

        This method takes the public ID of an image hosted on the Cloudinary service
        and deletes it from the cloud storage.

        :param public_id (str): The public ID of the image to be deleted.

        """
        cloudinary.uploader.destroy(public_id)


    async def change_size(self, public_id: str, width: int) -> str:
        """
            Change the size of an image hosted on Cloudinary.

        This method takes the public ID of an image hosted on the Cloudinary service
        and changes its size by applying a width transformation.

        :param public_id (str): The public ID of the image to be resized.
        :param width (int): The new width in pixels to resize the image.

        :return: tuple[str, str]: A tuple containing the public URL and the public ID of the resized image.

        """
        img = CloudinaryImage(public_id).image(
            transformation=[{"width": width, "crop": "pad"}])
        url = img.split('"')
        upload_image = cloudinary.uploader.upload(url[1])
        return upload_image['url'], upload_image['public_id']
    
image_cloudinary = Img()





def resize_image(contents: bytes, new_width: int = 500, new_height: int = 400) -> bytes:
    """
    Resize the image using Pillow (PIL) library.

    Parameters:
    - contents: The binary content of the original image.
    - new_width: The desired width of the resized image.
    - new_height: The desired height of the resized image.

    Returns:
    - The binary content of the resized image.
    """
    with Image.open(BytesIO(contents)) as img:
        resized_img = img.resize((new_width, new_height))
        output_buffer = BytesIO()
        resized_img.save(output_buffer, format="JPEG")
        return output_buffer.getvalue()