# 🪟 Windows

### Contents

- [Prerequisites](windows.md#prerequisites)
  - [WSL2 Ubuntu](windows.md#wsl2-ubuntu)
  - [Direnv](windows.md#direnv)
  - [PostgreSQL 14](windows.md#postgresql-14)

### Prerequisites

#### WSL2 Ubuntu

Install Ubuntu on Windows using WSL using [these instructions](https://learn.microsoft.com/en-us/windows/wsl/install).

#### Direnv

Install direnv:

```sh
curl -sfL https://direnv.net/install.sh | bash
```

#### PostgreSQL 14

Install and start PostgreSQL 14.x ([guide](https://harshityadav95.medium.com/postgresql-in-windows-subsystem-for-linux-wsl-6dc751ac1ff3)):

```sh
sudo apt-get install -y postgresql-14
sudo service postgresql start
```

Set the password for the `postgres` user:

```sh
sudo -u postgres psql -c "ALTER USER postgres WITH ENCRYPTED PASSWORD 'password'"
```
