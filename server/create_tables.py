# import mysql.connector
# from database import db_config

# # Database connection configuration
# # db_config = {
# #     'host': 'localhost',
# #     'user': 'root',
# #     'password': 'root',
# #     'database': 'sys'
# # }

# # SQL queries to create tables
# create_user_table_query = """
# CREATE TABLE IF NOT EXISTS User (
#     user_id INT PRIMARY KEY,
#     password VARCHAR(255)
# )
# """

# create_comments_table_query = """
# CREATE TABLE IF NOT EXISTS Comments (
#     comment_id INT AUTO_INCREMENT PRIMARY KEY,
#     place_id INT,
#     comment_text TEXT,
#     user_id INT,
#     FOREIGN KEY (user_id) REFERENCES User(user_id)
# )
# """

# create_places_table_query = """
# CREATE TABLE IF NOT EXISTS Places (
#     place_id INT PRIMARY KEY,
#     name VARCHAR(255),
#     description TEXT,
#     image VARCHAR(255),
#     status INT DEFAULT 1
# )
# """

# create_search_table_query = """
# CREATE TABLE IF NOT EXISTS search_table (
#     user_id INT,
#     search_text VARCHAR(255),
#     FOREIGN KEY (user_id) REFERENCES User(user_id)
# )
# """


# def get_search_results_by_userid(user_id):
#     try:
#         # Connect to the database
#         conn = mysql.connector.connect(**db_config)
#         cursor = conn.cursor()

#         # Execute SQL query
#         cursor.execute("SELECT search_text FROM search_table WHERE user_id = %s", (user_id,))
#         results = cursor.fetchall()

#         return {"search_results": [result[0] for result in results]}  # Extracting search_text from results

#     except mysql.connector.Error as e:
#         return {"error": str(e)}

#     finally:
#         # Close connection
#         if conn.is_connected():
#             cursor.close()
#             conn.close()
    

# def create_tables():
#     try:
#         # Connect to the database
#         conn = mysql.connector.connect(**db_config)
#         cursor = conn.cursor()

#         # Execute the create table queries
#         cursor.execute(create_user_table_query)
#         cursor.execute(create_comments_table_query)
#         cursor.execute(create_places_table_query)
#         cursor.execute(create_search_table_query)

#         # Commit changes
#         conn.commit()

#         print("Tables created successfully.")

#     except mysql.connector.Error as e:
#         print(f"Error: {e}")

#     finally:
#         # Close connection
#         if conn.is_connected():
#             cursor.close()
#             conn.close()

# if __name__ == "__main__":
#     create_tables()


import mysql.connector
from database import db_config

# Database connection configuration
# db_config = {
#     'host': 'localhost',
#     'user': 'root',
#     'password': 'root',
#     'database': 'sys'
# }

# SQL queries to create tables
create_user_table_query = """
CREATE TABLE IF NOT EXISTS User (
    user_id VARCHAR(50) PRIMARY KEY,
    password VARCHAR(255)
)
"""

create_comments_table_query = """
CREATE TABLE IF NOT EXISTS Comments (
    comment_id VARCHAR(50) PRIMARY KEY,
    place_id VARCHAR(50),
    comment_text TEXT,
    user_id VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES User(user_id)
)
"""

create_places_table_query = """
CREATE TABLE IF NOT EXISTS Places (
    place_id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    image VARCHAR(255),
    status INT DEFAULT 1
)
"""

create_search_table_query = """
CREATE TABLE IF NOT EXISTS search_table (
    user_id VARCHAR(50),
    search_text VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES User(user_id)
)
"""


def get_search_results_by_userid(user_id):
    try:
        # Connect to the database
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Execute SQL query
        cursor.execute("SELECT search_text FROM search_table WHERE user_id = %s", (user_id,))
        results = cursor.fetchall()

        return {"search_results": [result[0] for result in results]}  # Extracting search_text from results

    except mysql.connector.Error as e:
        return {"error": str(e)}

    finally:
        # Close connection
        if conn.is_connected():
            cursor.close()
            conn.close()
    

def create_tables():
    try:
        # Connect to the database
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Execute the create table queries
        cursor.execute(create_user_table_query)
        cursor.execute(create_comments_table_query)
        cursor.execute(create_places_table_query)
        cursor.execute(create_search_table_query)

        # Commit changes
        conn.commit()

        print("Tables created successfully.")

    except mysql.connector.Error as e:
        print(f"Error: {e}")

    finally:
        # Close connection
        if conn.is_connected():
            cursor.close()
            conn.close()

if __name__ == "__main__":
    create_tables()
