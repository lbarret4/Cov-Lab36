CREATE TABLE blogs
(
    id INT NOT NULL auto_increment PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    authorid int(11) NOT NULL,
    content TEXT NULL,
    _created DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_authorid` 
        FOREIGN KEY (`authorid`) 
        REFERENCES `authors` (`id`)

);

CREATE TABLE authors
(
    id INT NOT NULL auto_increment PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    email VARCHAR(254) NOT NULL,
    hash VARCHAR(60) NOT NULL,
    _created DATETIME DEFAULT CURRENT_TIMESTAMP

);


CREATE TABLE tags
(
    id INT NOT NULL auto_increment PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    _created DATETIME DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE blogtags
(
    blogid INT NOT NULL,
    tagid INT NOT NULL,
    _created DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (blogid,tagid),
    CONSTRAINT fk_mn_blogid 
        FOREIGN KEY(blogid)
        REFERENCES blogs(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_mn_tagid
        FOREIGN KEY (tagid)
        REFERENCES tags(id)
        ON DELETE CASCADE
);

CREATE TABLE tokens
(
    id INT NOT NULL auto_increment,
    authorid INT NOT NULL,
  PRIMARY KEY (id, authorid),
 CONSTRAINT authorid_fk
    FOREIGN KEY (authorid)
    REFERENCES authors(id)

);

-- Create users using create user form (url:http://localhost:3000/login) for this table and then runs insert for other tables below.
INSERT INTO authors(name,email,hash)
VALUES  ('Charles','test1@test.com','********'),
        ('Jemma','test2@test.com','********'),
        ('Kim','test3@test.com','********'),
        ('Amanda','test4@test.com','********'),
        ('Kenji','test5@test.com','********'),
        ('John','test6@test.com','********'),
        ('Candice','test7@test.com','********');

INSERT INTO blogs(title,authorid, content,_created)
VALUES('Blog Title 1',6,'Words Words Words .Words .Words .Words. Words. Words .Words Words Words Words .Words','2018-09-18 09:38:32'),
('Blog Title 2',4,'Words Words Words .Words .Words .Words. Words. Words .Words Words Words Words .Words','2018-09-19 09:38:33'),
('Blog Title 3',2,'Words Words Words .Words .Words .Words. Words. Words .Words Words Words Words .Words','2018-09-20 09:38:34'),
('Blog Title 4',7,'Words Words Words .Words .Words .Words. Words. Words .Words Words Words Words .Words','2018-09-21 09:38:35'),
('Blog Title 5',1,'Words Words Words .Words .Words .Words. Words. Words .Words Words Words Words .Words','2018-09-24 09:38:36'),
('Inserted Blog Title',3,'Added Words Added Words Added Words .Added Words .Added Words .Added Words. Added Words. Added Words .Added WordsAdded  Words Added Words Added Words .Added Words','2018-09-25 11:38:47'),
('Edited Blog Title ',5,'Words Words Words .Words .Words .Words. Words. Words .Words Words Words Words .Words','2018-09-30 12:55:58');


INSERT INTO tags(name)
VALUES  ('food'),      
        ('coding'),
        ('fun'),
        ('sports'),
        ('games'),
        ('television'),
        ('Covalence'),
        ('javascript'),
        ('movies'),
         ('tech');

INSERT INTO blogtags(blogid,tagid)
VALUES
(1,1),
(1,3),
(1,5),
(1,4),
(2,2),
(2,7),
(2,8),
(3,6),
(3,10),
(3,2),
(3,3),
(4,2),
(4,10),
(4,3),
(5,9),
(5,6),
(5,10),
(5,1),
(5,3),
(6,1),
(6,2),
(6,3),
(7,5),
(7,6),
(7,7),
(7,8),
(7,10);