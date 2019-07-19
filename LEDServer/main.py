from fastapi import FastAPI
import subprocess

app = FastAPI()


# return: command result if OK -> 0 else error
def process_call(cmd: str) -> str:
    result = subprocess.check_output(cmd.split())
    return str(result)


@app.get("/")
def read_item(light: str = None) -> dict:
    if light not in ['on', 'off']:
        return {"400": "Bad Request"}
    elif light == 'on':
        return light_on()
    elif light == 'off':
        return light_off()
    else:
        return {'500': 'internal server error'}


def light_on() -> dict:
    r = process_call('python3 irrp.py -p -g17 -f codes light:on')
    if r == b"":
        return {"503":"Service Unavailable \n" + r}
    return {"200": "OK"}


def light_off() -> dict:
    r = process_call('python3 irrp.py -p -g17 -f codes light:off')
    if r == b"":
        return {"503":"Service Unavailable \n" + r}
    return {"200": "OK"}

    pass
