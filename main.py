import uvicorn
import os
import asyncio

from dotenv import load_dotenv
from fastapi import FastAPI, Request, status, Header
from fastapi.middleware import Middleware
from fastapi.middleware.cors import CORSMiddleware
from httpx import AsyncClient
from pyngrok import ngrok

from src.routes import bot_actions, fillers, dishes, categories, users, tags, ingredients, premixes, comments



load_dotenv()
TG_API = os.getenv("BOT_TOKEN")

app = FastAPI()
header = Header({"ngrok-skip-browser-warning": True})

origins = ["http://172.25.8.7:3000/React-cocktails",
            "http://localhost:3000/React-cocktails",
            "https://andrijdudar.github.io/React-cocktails/", 
            "http://localhost:3000", "http://localhost:3000/React-cocktails", 
            "http://localhost:8000", 
            "https://fb64-46-119-118-70.ngrok.io/api/grids/",
            "https://andrijdudar.github.io/React-cocktails/",
            "https://andrijdudar.github.io"
            
           ] 

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



app.include_router(bot_actions.router, prefix='/api')
app.include_router(dishes.router, prefix='/api')
app.include_router(fillers.router, prefix='/api')
app.include_router(categories.router, prefix='/api')
app.include_router(users.router, prefix='/api')
app.include_router(tags.router, prefix="/api")
app.include_router(ingredients.router, prefix="/api")
app.include_router(premixes.router, prefix="/api")
app.include_router(comments.router, prefix="/api")




TELEGRAM_SET_WEBHOOK_URL = f"https://api.telegram.org/bot{TG_API}/setWebhook" #?url=https://{whook}/api/bot_actions/webhook


@app.get('/hello/', status_code=status.HTTP_200_OK)
async def hello():
    message = {'message': 'hello!'}
    return message


async def request(url: str):#, payload: dict, debug: bool = False):
    async with AsyncClient() as client:
        request = await client.post(url)#, json=payload)
        # if debug:
        #     print(request.json())
        return request

async def set_telegram_webhook_url() -> bool:
    payload = {"url": f"{HOST_URL}/webhook/?url=https://{TG_API}/api/bot_actions/webhook"}
    req = await request(f"https://api.telegram.org/bot{TG_API}/setWebhook?url={HOST_URL}/api/bot_actions/webhook")#TELEGRAM_SET_WEBHOOK_URL, payload)
    return req.status_code == 200



if __name__ == "__main__":
    # uvicorn.run("main:app", port=8000, host="localhost", reload=True)
    PORT = 8000
    http_tunnel = ngrok.connect(PORT, bind_tls=True)#, proto="http", name="dynamo-blues")
    public_url = http_tunnel.public_url
    HOST_URL = public_url
    print(HOST_URL)
    loop = asyncio.get_event_loop()
    success = loop.run_until_complete(set_telegram_webhook_url())

    if success:
        uvicorn.run("main:app", host="127.0.0.1", port=PORT, log_level="info", reload=True)
    else:
        print("Fail, closing the app.")
    # uvicorn.run("main:app", host="127.0.0.1", port=PORT, log_level="info", reload=True)

#f"https://api.telegram.org/bot{TG_API}/setWebhook?url=https://{whook}/api/bot_actions/webhook")
