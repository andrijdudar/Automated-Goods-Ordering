import os
import hashlib
import json
import functools
import logging
import requests
from datetime import datetime
from os.path import join, dirname
from dotenv import load_dotenv



logger = logging.getLogger(__name__)

def handle_errors(method):
    """
    The handle_errors function is a decorator that wraps the decorated function in a try/except block.
    If an exception occurs, it logs the error and returns None.
    
    :param method: Pass the method to be decorated
    :return: A wrapper function
    :doc-author: Trelent
    """
    @functools.wraps(method)
    def wrapper(self, *args, **kwargs):
        """
        The wrapper function is a decorator that wraps the original function.
            It prints out the name of the function and its arguments, then calls
            it. If an exception occurs, it logs that exception to a file.
        
        :param self: Allow an instance of the class to call its own methods
        :param *args: Send a non-keyworded variable length argument list to the function
        :param **kwargs: Pass a variable number of keyword arguments to the function
        :return: The result of the method or an error message if something goes wrong
        :doc-author: Trelent
        """
        logging.basicConfig(level=logging.INFO)
        try:
            return method(self, *args, **kwargs)
        except Exception as e:
            logger.info(f"Something wrong wit method '{method.__name__}': {e}")
    return wrapper



class IikoAPIHandler:
    def __init__(self):
        """
        The __init__ function is called when the class is instantiated.
        It sets up the instance variables that will be used by other methods in the class.
        
        
        :param self: Represent the instance of the class
        :return: None by default, but you can return other values
        :doc-author: Trelent
        """
        self.__login = os.environ.get("RESTO_LOGIN")
        self.__password = os.environ.get("RESTO_PASSWORD")
        self.sha1_encoding = hashlib.sha1()
        self._auth_url = "https://dinamo-blues.syrve.online:443/resto/api/auth"
        self._storage_url = "https://dinamo-blues.syrve.online:443/resto/api/corporation/stores"
        self._nomenclature_url = "https://dinamo-blues.syrve.online:443/resto/api/v2/entities/products/list"
        self._products_url = "https://dinamo-blues.syrve.online:443/resto/api/v2/reports/balance/stores"
        self.__token = self.get_authorization_token()
        self.timestamp = self.get_current_timestamp()


    @handle_errors
    def get_authorization_token(self) -> list[dict]:
        """
        The get_authorization_token function is used to get the authorization token from the server.
                The function returns a list of dictionaries with keys: 'token' and 'user_id'.
                     
        :param self: Access the attributes and methods of a class
        :return: A list of dictionaries
        :doc-author: Trelent
        """
        self.sha1_encoding.update(self.__password.encode('utf-8'))  
        password_encoded = self.sha1_encoding.hexdigest()
        data = {"login": self.__login, "pass": password_encoded}
        response = requests.post(url=self._auth_url, data=data)
        return response.text

    @handle_errors
    def get_nomenclature(self) -> list[dict]:
        """
        The get_nomenclature function returns a list of dictionaries containing the nomenclature for each item in the database.
            The function takes no arguments and returns a list of dictionaries.
        
        :param self: Reference the object itself
        :return: A list of dictionaries, each dictionary representing a nomenclature
        :doc-author: Trelent
        """
        full_url = f"{self._nomenclature_url}?key={self.__token}"
        response = requests.get(url=full_url)
        return response.text

    @handle_errors
    def get_products(self) -> list[dict]:
        """
        The get_products function returns a list of dictionaries containing the product information.

        :param self: Refer to the current instance of the class
        :return: A list of dictionaries
        :doc-author: Trelent
        """
        full_url = f"{self._products_url}?key={self.__token}&timestamp={self.timestamp}"
        response = requests.get(full_url)
        return response.text

    @handle_errors
    def get_current_timestamp(self) -> str:
        """
        The get_current_timestamp function returns a string representing the current UTC time.
            The format of the returned string is: YYYY-MM-DDTHH:MM:SS
        
        :param self: Represent the instance of the class
        :return: A string that represents the current timestamp
        :doc-author: Trelent
        """
        current_timestamp = datetime.utcnow()
        timestamp_str = current_timestamp.strftime("%Y-%m-%dT%H:%M:%S")
        return timestamp_str

    @handle_errors
    def get_storage_balance(self) -> list[dict]:
        """
        The get_storage_balance function returns a list of dictionaries containing the product id, name and balance.
            The function uses the get_products and get_nomenclature functions to retrieve data from two different endpoints.
            It then iterates through both lists of dictionaries to find matching ids between products and nomenclature.
            If there is a match, it adds the item's name as an additional key-value pair in the product dictionary.
        
        :param self: Represent the instance of the class
        :return: A list of dictionaries
        :doc-author: Trelent
        """
        products = json.loads(self.get_products())
        nomenclature = json.loads(self.get_nomenclature())

        for product in products:
            prod_id = product.get("product")
            for item in nomenclature:
                item_id = item.get("id")
                item_name = item.get("name")

                if prod_id == item_id:
                    product["name"] = item_name
                
        return products


iiko_server = IikoAPIHandler()
storage_balance = iiko_server.get_storage_balance()
print(storage_balance)






