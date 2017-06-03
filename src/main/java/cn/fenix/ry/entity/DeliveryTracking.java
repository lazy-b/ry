package cn.fenix.ry.entity;

import java.io.Serializable;
import java.util.Date;

public class DeliveryTracking implements Serializable {
	private static final long serialVersionUID = 2048088272853579763L;
	   
	   private String deliveryRecordId;
	   private String prDeliveryId;
	   private String prPickingId;
	   private String prReturnId;
	   private String orderNo;
	   private Date orderDate;
	   private Date deliveryDate;	
	   private Integer orderAmount;
	   private String productName;
	   private String materialCoding;
	   private Integer deliveryAmount;
	   private Integer returnAmount;
	   private Integer badAmount;
	   private Integer balanceAmount;
	   private Double unitPrice;
	   private Double unpaidMoney;
	   private Double orderMoney;
	   private String remarks;
	   private Date created;
	   private Date updated;
	public String getDeliveryRecordId() {
		return deliveryRecordId;
	}
	public void setDeliveryRecordId(String deliveryRecordId) {
		this.deliveryRecordId = deliveryRecordId;
	}
	public String getPrDeliveryId() {
		return prDeliveryId;
	}
	public void setPrDeliveryId(String prDeliveryId) {
		this.prDeliveryId = prDeliveryId;
	}
	public String getPrPickingId() {
		return prPickingId;
	}
	public void setPrPickingId(String prPickingId) {
		this.prPickingId = prPickingId;
	}
	public String getPrReturnId() {
		return prReturnId;
	}
	public void setPrReturnId(String prReturnId) {
		this.prReturnId = prReturnId;
	}
	public String getOrderNo() {
		return orderNo;
	}
	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}
	public Date getOrderDate() {
		return orderDate;
	}
	public void setOrderDate(Date orderDate) {
		this.orderDate = orderDate;
	}
	public Date getDeliveryDate() {
		return deliveryDate;
	}
	public void setDeliveryDate(Date deliveryDate) {
		this.deliveryDate = deliveryDate;
	}
	public Integer getOrderAmount() {
		return orderAmount;
	}
	public void setOrderAmount(Integer orderAmount) {
		this.orderAmount = orderAmount;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public String getMaterialCoding() {
		return materialCoding;
	}
	public void setMaterialCoding(String materialCoding) {
		this.materialCoding = materialCoding;
	}
	public Integer getDeliveryAmount() {
		return deliveryAmount;
	}
	public void setDeliveryAmount(Integer deliveryAmount) {
		this.deliveryAmount = deliveryAmount;
	}
	public Integer getReturnAmount() {
		return returnAmount;
	}
	public void setReturnAmount(Integer returnAmount) {
		this.returnAmount = returnAmount;
	}
	public Integer getBadAmount() {
		return badAmount;
	}
	public void setBadAmount(Integer badAmount) {
		this.badAmount = badAmount;
	}
	public Integer getBalanceAmount() {
		return balanceAmount;
	}
	public void setBalanceAmount(Integer balanceAmount) {
		this.balanceAmount = balanceAmount;
	}
	public Double getUnitPrice() {
		return unitPrice;
	}
	public void setUnitPrice(Double unitPrice) {
		this.unitPrice = unitPrice;
	}
	public Double getUnpaidMoney() {
		return unpaidMoney;
	}
	public void setUnpaidMoney(Double unpaidMoney) {
		this.unpaidMoney = unpaidMoney;
	}
	public Double getOrderMoney() {
		return orderMoney;
	}
	public void setOrderMoney(Double orderMoney) {
		this.orderMoney = orderMoney;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public Date getCreated() {
		return created;
	}
	public void setCreated(Date created) {
		this.created = created;
	}
	public Date getUpdated() {
		return updated;
	}
	public void setUpdated(Date updated) {
		this.updated = updated;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
}
