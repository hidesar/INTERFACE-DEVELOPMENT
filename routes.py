import csv 
import json

def all_routes():
    file = open("csvfiles/routes.csv")
    reader = csv.DictReader(file)
    route_list = []
    for row in reader:
        route_list.append(row)
    file.close()
    return json.dumps({"routes": route_list})

def get_route(route_file):
    file = open(route_file)
    reader = csv.DictReader(file)
    points_list = []
    for row in reader:
        points_list.append(row)
    file.close()
    return json.dumps({"points": points_list})


print(all_routes())
print(get_route('csvfiles/acropolis.csv'))
print(get_route('csvfiles/monastiraki.csv'))
print(get_route('csvfiles/lemesos.csv'))