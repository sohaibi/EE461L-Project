import datetime
# reference : https://docs.python.org/3/library/datetime.html#strftime-strptime-behavior
# accurate current time, saved into mongoDB
now = datetime.datetime.now()
print(now)

# format time, displayed on the webpage
formatted_now = now.strftime("%Y-%m-%d %H:%M:%S")
print(formatted_now)
