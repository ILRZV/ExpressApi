Start: docker-compose up

Registration:

http://localhost:3000/signup
{
"identity": "newemailare@gmail.com",
"password": "newFs351315a"
}

Дополнения по поводу задания:

Именовать email/phone поле как id не предусмотретельно:

1. Хранить email/phone в качестве primary key неразумно так как поиск по этому полю будет в разы дольше из-за
   разницы в скорости сравнения чисел и строк.
2. Значит нужен primary id numeric key, соотвественно в этот момент появляется сущность id, относящаяся к юзеру,
   состоящая из его номера в базе данных. Именование еще одной сущности относящейся к email/phone пользователя как id
   может привести к недопонимаю между командами разработки и заказчиком.
   Как предложение - заменить id на identity

Rest наименования:
В задании есть урлы
/file/:id [GET]
/file/delete/:id [DELETE]
/file/update/:id [PUT]
Именование последних двух избыточно по принципам Rest:
/file/:id [GET]
/file/:id [DELETE]
/file/:id [PUT]
