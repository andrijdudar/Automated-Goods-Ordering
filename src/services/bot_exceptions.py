from icecream import ic


def bot_exceptions(func):
    # ic()
    def inner(*args, **kwargs):
        # ic()
        try:
            return func(*args, **kwargs)
        except BaseException as e:
            print(f'Error in "{func.__name__}" function: {e}')
            print('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
    return inner

