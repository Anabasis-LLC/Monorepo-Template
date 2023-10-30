# 🐧 Ubuntu

### Contents

- [Prerequisites](ubuntu.md#prerequisites)
  - [WSL2 Ubuntu](ubuntu.md#wsl2-ubuntu)
  - [Direnv](ubuntu.md#direnv)
  - [PostgreSQL 15](ubuntu.md#postgresql-15)

### Prerequisites

#### Direnv

Install direnv:

```sh
curl -sfL https://direnv.net/install.sh | bash
```

#### PostgreSQL 15

Install and start PostgreSQL 15.x:

```sh
sudo apt-get install -y postgresql
sudo service postgresql start
```

Set the password for the `postgres` user:

```sh
sudo -u postgres psql -c "ALTER USER postgres WITH ENCRYPTED PASSWORD 'password'"
```
