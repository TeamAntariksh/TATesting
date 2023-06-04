import csv 

kids = []

with open("stuff2.csv") as file:
    csvFile = csv.DictReader(file)

    for lines in csvFile:
        kids.append(lines)
kids.pop(0)

print(kids)
htmlString = ""
for kid in kids:
    # print(kid)
    htmlString += f"<tr><td>{kid['NAME']}</td><td>{kid['BRANCH']}</td><td>{kid['SUBSYSTEM']}</td></tr>"
    
print(htmlString)
"""<tr><td>Kanishka Deepak</td><td>ASE</td><td>Recovery</td></tr>"""