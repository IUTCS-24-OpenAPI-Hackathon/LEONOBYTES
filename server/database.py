# import mysql.connector

# # Database connection configuration
# db_config = {
#     'host': 'localhost',
#     'user': 'root',
#     'password': 'root',
#     'database': 'sys'
# }

# # Connect to the database
# conn = mysql.connector.connect(**db_config)
# cursor = conn.cursor()

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

# # Execute the create table queries
# cursor.execute(create_user_table_query)
# cursor.execute(create_comments_table_query)

# # Commit changes
# conn.commit()


# # Database Models
# class User:
#     @staticmethod
#     def create(user_id, password):
#         try:
#             cursor.execute("INSERT INTO User (user_id, password) VALUES (%s, %s)", (user_id, password))
#             conn.commit()
#             return {"message": "User created successfully"}
#         except mysql.connector.Error as e:
#             return {"error": str(e)}


# class Comment:
#     @staticmethod
#     def create(place_id, comment_text, user_id):
#         try:
#             cursor.execute("INSERT INTO Comments (place_id, comment_text, user_id) VALUES (%s, %s, %s)",
#                            (place_id, comment_text, user_id))
#             conn.commit()
#             return {"message": "Comment added successfully"}
#         except mysql.connector.Error as e:
#             return {"error": str(e)}

#     @staticmethod
#     def get_by_place_id(place_id):
#         try:
#             cursor.execute("SELECT c.comment_text, u.user_id FROM Comments c JOIN User u ON c.user_id = u.user_id WHERE c.place_id = %s", (place_id,))
#             comments = cursor.fetchall()
#             return {"comments": comments}
#         except mysql.connector.Error as e:
#             return {"error": str(e)}

# # Close connection
# conn.close()

# print("Tables created successfully.")


import mysql.connector

# Database connection configuration
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'Rubaiyat26',
    'database': 'sys'
}

# Function to connect to the database
def connect_to_database():
    return mysql.connector.connect(**db_config)
