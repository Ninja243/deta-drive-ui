from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse

app = FastAPI()

@app.get("/")
async def root():
    return HTMLResponse(content=open("build/index.html", 'r').read())

app.mount("/", StaticFiles(directory="build"), name="build")