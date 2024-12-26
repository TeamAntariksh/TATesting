import pandas as pd

data = pd.read_csv('SecondRound.csv')

# print(data['Department'].value_counts())

deptList = data["Department"].unique()
deptList.sort()
htmlString = ""
for dept in deptList:
    nameListStr = ""
    for name in data[data['Department'] == dept]['Name']:
        nameListStr += f"            <tr><td>{name.title()}</td></tr>\n"

    deptStr = f"""
    <button class="accordion">{dept}<span></span></button>
    <div class="panel">
        <table class="container-table">
            <tbody class="table-hover">
                <tr class="tab-heading">
                    <td>Name</td>        
                </tr>
                {nameListStr}
            </tbody>
        </table>
    </div>
"""
    htmlString += deptStr
    

op = f"""
<div class="panel-group">   {htmlString}
</div>"""

with open('op.txt', 'w') as file:
    file.write(op)
Name = "Hello"
nameStr = f"""
            <tr><td>{Name}</td></tr>
"""

dept = "Aerospace"
deptStr = f"""
<button class="accordion">{dept}<span></span></button>
<div class="panel">
    <table class="container-table">
        <tbody class="table-hover">
            <tr class="tab-heading">
                <td>Name</td>        
            </tr>
            {nameListStr}
	    </tbody>
    </table>
</div>
     """


"""
"""