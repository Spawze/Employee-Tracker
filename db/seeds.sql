INSERT INTO departments (dep_name)
VALUES  ("Operations"),
        ("Human Resources"),
        ("Cafeteria");
INSERT INTO roles (role_name, salary, department_id)
VALUES  ("Grocery Picker", 36000, 1),
        ("Perishables Picker", 36000, 1),
        ("Picking Manager", 45000, 1),

        ("Font Desk Guard", 35000, 2),
        ("HR Rep", 38000,2),
        ("HR Manager", 40000,2),

        ("Cafeteria Cook", 30000, 3),
        ("Cafeteria Cashier", 30000, 3),
        ("Cafeteria Manager", 38000, 3);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES  ('Ana',"Amari",3,NULL),
        ('Angela','Ziegler',6,NULL),
        ('Mako','Rutledge',9,NULL),

        ('Elizabeth',"Ashe",1,1),
        ('Jean', 'Augustin',1,1),
        ('Brig','Lindholm',2,1),
        ('Odessa','Stone',1,1),
        ('Mei','Zhou',2,1),
        ('Vivian','Chase',1,1),
        ('Lena','Oxton',2,1),

        ('Hana','Song',5,2),
        ('Cole','Cassidy',4,2),
        ('Moira','ODeorain',5,2),
        ('Fareeha','Amari',4,2),
        ('Jack','Morison',4,2),

        ('Akande','Ogundimu',8,3),
        ('Jamison','Fawkes',7,3),
        ('Gabrial','Reyes',7,3),
        ('Siebren','Kuiper',8,3),
        ('Torb', 'Lindholm',7,3);