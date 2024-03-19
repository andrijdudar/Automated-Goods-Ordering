import g4f


class Gpt:
    def __init__(self, content: str) -> None:
            self.content = content
            self.response = g4f.ChatCompletion.create(
                model=g4f.models.gpt_4, 
                messages=[{'role': 'user', 'content': content}])
            
    def get_answer(self) -> str:
        return self.response

