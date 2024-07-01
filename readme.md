# Scope

package consists of 2 folders: frontend (react) backend (express + redis)
the reason redis was selected is for its simplicity and simplicity of requirements
(in production needs would of course use additional database according to needs)
MUI used as UI/UX library and state managed in react built-in hooks
Still missing filtering (planned to use fusejs for this)

# Run

- $ docker compose up
- visit: [http://localhost:4173/] (might load slower with edge, better use chrome or firefox)

# Usage

the screen is split into 2 sides:
on the left side press Fetch button to fetch data from the API
on the right side press history buttonto to fetch data from history (which stored on redis)
access container with command such as [-$ docker container exec -u 0 -it ID bash]
