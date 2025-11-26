from locust import HttpUser, task, between
import random
import time

endpoints = [
    "/posts",
    "/comments",
    "/albums",
    "/photos",
    "/todos",
    "/users"
]

class PublicAPITest(HttpUser):
    wait_time = between(1, 2)

    @task
    def hit_public_api(self):
        ep = random.choice(endpoints)
        start = time.time()

        try:
            response = self.client.get(ep)
            latency = int((time.time() - start) * 1000)
            status = response.status_code
        except:
            latency = 0
            status = 500

        # Add artificial failures (15% chance)
        if random.random() < 0.15:
            status = random.choice([400, 404, 500])

        with open("logs/app.log", "a") as f:
            f.write(f"{ep} {latency} {status}\n")
