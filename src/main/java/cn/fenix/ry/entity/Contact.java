package cn.fenix.ry.entity;

public class Contact {
	private Integer contactsId;
	private Integer clientId;
	private String contacts;
	private String station;
	private String manage;
	private String telephone;
	private String palneNumber;
	private String email;
	
	public Contact() {
		super();
		
	}
	public Contact(Integer contactsId, Integer clientId, String contacts, String station, String manage,
			String telephone, String palneNumber, String email) {
		super();
		this.contactsId = contactsId;
		this.clientId = clientId;
		this.contacts = contacts;
		this.station = station;
		this.manage = manage;
		this.telephone = telephone;
		this.palneNumber = palneNumber;
		this.email = email;
	}
	public Integer getContactsId() {
		return contactsId;
	}
	public void setContactsId(Integer contactsId) {
		this.contactsId = contactsId;
	}
	public Integer getClientId() {
		return clientId;
	}
	public void setClientId(Integer clientId) {
		this.clientId = clientId;
	}
	public String getContacts() {
		return contacts;
	}
	public void setContacts(String contacts) {
		this.contacts = contacts;
	}
	public String getStation() {
		return station;
	}
	public void setStation(String station) {
		this.station = station;
	}
	public String getManage() {
		return manage;
	}
	public void setManage(String manage) {
		this.manage = manage;
	}
	public String getTelephone() {
		return telephone;
	}
	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}
	public String getPalneNumber() {
		return palneNumber;
	}
	public void setPalneNumber(String palneNumber) {
		this.palneNumber = palneNumber;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	@Override
	public String toString() {
		return "Contact [contactsId=" + contactsId + ", clientId=" + clientId + ", contacts=" + contacts + ", station="
				+ station + ", manage=" + manage + ", telephone=" + telephone + ", palneNumber=" + palneNumber
				+ ", email=" + email + "]";
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((contactsId == null) ? 0 : contactsId.hashCode());
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Contact other = (Contact) obj;
		if (contactsId == null) {
			if (other.contactsId != null)
				return false;
		} else if (!contactsId.equals(other.contactsId))
			return false;
		return true;
	}
	   
	   
}
