CREATE DATABASE booktradingapp;

CREATE TABLE "city" (
  "ID" serial ,
  "name" varChar(35) NOT NULL,
  primary key("ID")
);

CREATE TABLE "genre" (
  "ID" serial,
  "name" varChar(30) NOT NULL,
  primary key("ID")
);

CREATE TABLE "language" (
  "ID" serial,
  "name" varChar(30) NOT NULL,
  primary key("ID")
);

CREATE TABLE "author" (
  "ID" serial,
  "name" varChar(100) NOT NULL,
  primary key("ID")
);

CREATE TABLE "book" (
  "ID" serial,
  "Title" varChar(100) NOT NULL,
  "genreID" int,
  "isbn" int,
  "authorID" int,
  "languageID" int,
  "purshacePrice" float NOT NULL,
  "version" int NOT NULL,
  "description" varChar(2000) NOT NULL,
  "image" varChar(100) NOT NULL,
  primary key("ID"),
  CONSTRAINT "FK_book.genreID"
    FOREIGN KEY ("genreID")
      REFERENCES "genre"("ID")
      ON UPDATE CASCADE
      ON DELETE SET NULL    
      ,
  CONSTRAINT "FK_book.languageID"
    FOREIGN KEY ("languageID")
      REFERENCES "language"("ID")
       ON UPDATE CASCADE
       ON DELETE SET NULL
      ,
  CONSTRAINT "FK_book.authorID"
    FOREIGN KEY ("authorID")
      REFERENCES "author"("ID")
       ON UPDATE CASCADE
      ON DELETE SET NULL
);

CREATE TABLE "user" (
  "ID" serial,
  "firstName" varChar(35) NOT NULL,
  "lastName" varChar(35) NOT NULL,
  "address" varChar(100) NOT NULL,
  "cityID" int,
  "userName" varChar(30) NOT NULL,
  "password" varChar(40) NOT NULL,
  "email" varChar(80) NOT NULL,
  "Type" smallint NOT NULL,
  primary key("ID"),
  CONSTRAINT "FK_user.cityID"
    FOREIGN KEY ("cityID")
      REFERENCES "city"("ID")
       ON UPDATE CASCADE
      ON DELETE SET NULL
);

CREATE TABLE "bidItem" (
  "ID" serial,
  "userID" int,
  "startingTime" timestamp,
  "endingTime" timestamp,
  "currentPrice" float NOT NULL,
  "bookID" int ,
  primary key("ID"),
  CONSTRAINT "FK_bidItem.userID"
    FOREIGN KEY ("userID")
      REFERENCES "user"("ID")
       ON UPDATE CASCADE
      ON DELETE SET NULL
      ,
  CONSTRAINT "FK_bidItem.bookID"
    FOREIGN KEY ("bookID")
      REFERENCES "book"("ID")
       ON UPDATE CASCADE
      ON DELETE CASCADE 
);

CREATE TABLE "bid" (
  "ID" serial,
  "userID" int NOT NULL,
  "bitITemID" int NOT NULL,
  "price" float NOT NULL,
  "status" int NOT NULL,
  primary key("ID"),
  CONSTRAINT "FK_bid.userID"
    FOREIGN KEY ("userID")
      REFERENCES "user"("ID")
       ON UPDATE CASCADE
      ON DELETE SET NULL,
  CONSTRAINT "FK_bid.bitITemID"
    FOREIGN KEY ("bitITemID")
      REFERENCES "bidItem"("ID")
       ON UPDATE CASCADE
      ON DELETE CASCADE
);

CREATE TABLE "notification" (
  "ID" serial,
  "userID" int NOT NULL,
  "read" smallint NOT NULL,
  "text" varChar(750) NOT NULL,
  primary key("ID"),
  CONSTRAINT "FK_notification.userID"
    FOREIGN KEY ("userID")
      REFERENCES "user"("ID")
       ON UPDATE CASCADE
      ON DELETE CASCADE
);

CREATE TABLE "whishListItem" (
  "userID" int NOT NULL,
  "bookID" int NOT NULL,
  primary key("userID","bookID"),
  CONSTRAINT "FK_whishListItem.userID"
    FOREIGN KEY ("userID")
      REFERENCES "user"("ID")
       ON UPDATE CASCADE
      ON DELETE CASCADE,
  CONSTRAINT "FK_whishListItem.bookID"
    FOREIGN KEY ("bookID")
      REFERENCES "book"("ID")
       ON UPDATE CASCADE
      ON DELETE CASCADE
);

CREATE TABLE "driver" (
  "SSN" int,
  "ID" serial,
  "bikeLicense" varChar(20) NOT NULL,
  "driverLicense" varChar(30) NOT NULL,
  "expirationDate" timestamp NOT NULL,
  "fees" float NOT NULL,
  primary key("SSN")
);

CREATE TABLE "coupons" (
  "ID" serial,
  "code" varChar(20) NOT NULL,
  "discount" float NOT NULL,
  "maximumUse" int NOT NULL,
  "isRelative" int NOT NULL,
  primary key("ID")
);

CREATE TABLE "order" (
  "ID" serial,
  "userID" int NOT NULL,
  "driverSSN" int,
  "orderDate" timestamp NOT NULL,
  "deliveryDate" timestamp,
  "status" int,
  "couponID" int,
  primary key("ID"),
  CONSTRAINT "FK_order.driverSSN"
    FOREIGN KEY ("driverSSN")
      REFERENCES "driver"("SSN")
       ON UPDATE CASCADE
      ON DELETE SET NULL,
  CONSTRAINT "FK_order.couponID"
    FOREIGN KEY ("couponID")
      REFERENCES "coupons"("ID")
       ON UPDATE CASCADE
      ON DELETE SET NULL,
  CONSTRAINT "FK_order.userID"
    FOREIGN KEY ("userID")
      REFERENCES "user"("ID")
       ON UPDATE CASCADE
      ON DELETE SET NULL
);

CREATE TABLE "ticketCategory" (
  "ID" serial,
  "name" varChar(50) NOT NULL,
  primary key("ID")
);

CREATE TABLE "ticket" (
  "ID" serial,
  "userID" int,
  "categoryID" int,
  "userComplaint" varChar(1000),
  "time" timestamp,
  primary key("ID"),
  CONSTRAINT "FK_ticket.userID"
    FOREIGN KEY ("userID")
      REFERENCES "user"("ID")
       ON UPDATE CASCADE
      ON DELETE SET NULL,
  CONSTRAINT "FK_ticket.categoryID"
    FOREIGN KEY ("categoryID")
      REFERENCES "ticketCategory"("ID")
       ON UPDATE CASCADE
      ON DELETE SET NULL
);

CREATE TABLE "ticketReply" (
  "ID" serial,
  "ticketID" int NOT NULL,
  "userID" int ,
  "reply" varChar (1000) NOT NULL,
  "time" timestamp NOT NULL,
  primary key("ID"),
  CONSTRAINT "FK_ticketReply.userID"
    FOREIGN KEY ("userID")
      REFERENCES "user"("ID")
       ON UPDATE CASCADE
      ON DELETE SET NULL,
  CONSTRAINT "FK_ticketReply.ticketID"
    FOREIGN KEY ("ticketID")
      REFERENCES "ticket"("ID")
       ON UPDATE CASCADE
      ON DELETE CASCADE
);

CREATE TABLE "orderItem" (
  "ID" serial,
  "bookID" int NOT NULL,
  "orderID" int NOT NULL,
  "quantity" int NOT NULL,
  primary key("ID"),
  CONSTRAINT "FK_orderItem.orderID"
    FOREIGN KEY ("orderID")
      REFERENCES "order"("ID")
       ON UPDATE CASCADE
      ON DELETE CASCADE,
  CONSTRAINT "FK_orderItem.bookID"
    FOREIGN KEY ("bookID")
      REFERENCES "book"("ID")
       ON UPDATE CASCADE
      ON DELETE  CASCADE
);

CREATE TABLE "feedback" (
  "ID" serial,
  "userID" int,
  "bookID" int NOT NULL,
  "comment" varChar(500) NOT NULL,
  "rating" float NOT NULL,
  primary key("ID"),
  CONSTRAINT "FK_feedback.userID"
    FOREIGN KEY ("userID")
      REFERENCES "user"("ID")
       ON UPDATE CASCADE
      ON DELETE SET NULL
      ,
  CONSTRAINT "FK_feedback.bookID"
    FOREIGN KEY ("bookID")
      REFERENCES "book"("ID")
       ON UPDATE CASCADE
      ON DELETE CASCADE
);

