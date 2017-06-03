package cn.fenix.ry.dao;

import cn.fenix.ry.entity.Contact;

public interface ContactsDao {
	void saveContact(Contact contact);
	Contact findContactById(int id);
}
