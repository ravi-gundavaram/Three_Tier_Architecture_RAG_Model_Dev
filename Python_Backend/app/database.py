import psycopg2


def connect_to_db():
    return psycopg2.connect(
        dbname="mydb", user="user", password="password", host="localhost"
    )
