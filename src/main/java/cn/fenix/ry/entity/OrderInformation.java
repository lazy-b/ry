package cn.fenix.ry.entity;

import java.io.Serializable;
import java.sql.Date;

public class OrderInformation implements Serializable{
	private static final long serialVersionUID = 2726342261326989546L;
	private String orderInformationId;
	   private String rowRecordId;
	   private Integer clientId;
	   private String deliveryRecordId;
	   private String orderDate;
	   private String requiredDate;
	   private String orderNo;
	   private String materialCoding;
	   private String productName;
	   private Integer orderAmount;
	   private Integer spareParts;
	   private Integer stockAmount;
	   private Integer planAmount;
	   private String materialModel;
	   private String purchaseRequirement;
	   private String returnDate;
	   private Integer shipmentStatus;
	   private Integer arrangeStatus;
	   private Integer orderType;
	   private Double price;
	   private String remarks;
	   private Date created;
	   private Date updated;
	public OrderInformation() {
		super();
		// TODO Auto-generated constructor stub
	}
	public OrderInformation(String orderInformationId, String rowRecordId, Integer clientId, String deliveryRecordId,
			String orderDate, String requiredDate, String orderNo, String materialCoding, String productName,
			Integer orderAmount, Integer spareParts, Integer stockAmount, Integer planeAmount, String materialModel,
			String purchaseRequirement, String returnDate, Integer shipmentStatus, Integer arrangeStatus,
			Integer orderType, Double price, String remarks, Date created, Date updated) {
		super();
		this.orderInformationId = orderInformationId;
		this.rowRecordId = rowRecordId;
		this.clientId = clientId;
		this.deliveryRecordId = deliveryRecordId;
		this.orderDate = orderDate;
		this.requiredDate = requiredDate;
		this.orderNo = orderNo;
		this.materialCoding = materialCoding;
		this.productName = productName;
		this.orderAmount = orderAmount;
		this.spareParts = spareParts;
		this.stockAmount = stockAmount;
		this.planAmount = planeAmount;
		this.materialModel = materialModel;
		this.purchaseRequirement = purchaseRequirement;
		this.returnDate = returnDate;
		this.shipmentStatus = shipmentStatus;
		this.arrangeStatus = arrangeStatus;
		this.orderType = orderType;
		this.price = price;
		this.remarks = remarks;
		this.created = created;
		this.updated = updated;
	}
	public String getOrderInformationId() {
		return orderInformationId;
	}
	public void setOrderInformationId(String orderInformationId) {
		this.orderInformationId = orderInformationId;
	}
	public String getRowRecordId() {
		return rowRecordId;
	}
	public void setRowRecordId(String rowRecordId) {
		this.rowRecordId = rowRecordId;
	}
	public Integer getClientId() {
		return clientId;
	}
	public void setClientId(Integer clientId) {
		this.clientId = clientId;
	}
	public String getDeliveryRecordId() {
		return deliveryRecordId;
	}
	public void setDeliveryRecordId(String deliveryRecordId) {
		this.deliveryRecordId = deliveryRecordId;
	}
	public String getOrderDate() {
		return orderDate;
	}
	public void setOrderDate(String orderDate) {
		this.orderDate = orderDate;
	}
	public String getRequiredDate() {
		return requiredDate;
	}
	public void setRequiredDate(String requiredDate) {
		this.requiredDate = requiredDate;
	}
	public String getOrderNo() {
		return orderNo;
	}
	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}
	public String getMaterialCoding() {
		return materialCoding;
	}
	public void setMaterialCoding(String materialCoding) {
		this.materialCoding = materialCoding;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public Integer getOrderAmount() {
		return orderAmount;
	}
	public void setOrderAmount(Integer orderAmount) {
		this.orderAmount = orderAmount;
	}
	public Integer getSpareParts() {
		return spareParts;
	}
	public void setSpareParts(Integer spareParts) {
		this.spareParts = spareParts;
	}
	public Integer getStockAmount() {
		return stockAmount;
	}
	public void setStockAmount(Integer stockAmount) {
		this.stockAmount = stockAmount;
	}
	public Integer getPlaneAmount() {
		return planAmount;
	}
	public void setPlaneAmount(Integer planeAmount) {
		this.planAmount = planeAmount;
	}
	public String getMaterialModel() {
		return materialModel;
	}
	public void setMaterialModel(String materialModel) {
		this.materialModel = materialModel;
	}
	public String getPurchaseRequirement() {
		return purchaseRequirement;
	}
	public void setPurchaseRequirement(String purchaseRequirement) {
		this.purchaseRequirement = purchaseRequirement;
	}
	public String getReturnDate() {
		return returnDate;
	}
	public void setReturnDate(String returnDate) {
		this.returnDate = returnDate;
	}
	public Integer getShipmentStatus() {
		return shipmentStatus;
	}
	public void setShipmentStatus(Integer shipmentStatus) {
		this.shipmentStatus = shipmentStatus;
	}
	public Integer getArrangeStatus() {
		return arrangeStatus;
	}
	public void setArrangeStatus(Integer arrangeStatus) {
		this.arrangeStatus = arrangeStatus;
	}
	public Integer getOrderType() {
		return orderType;
	}
	public void setOrderType(Integer orderType) {
		this.orderType = orderType;
	}
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
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
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((orderInformationId == null) ? 0 : orderInformationId.hashCode());
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
		OrderInformation other = (OrderInformation) obj;
		if (orderInformationId == null) {
			if (other.orderInformationId != null)
				return false;
		} else if (!orderInformationId.equals(other.orderInformationId))
			return false;
		return true;
	}
}
