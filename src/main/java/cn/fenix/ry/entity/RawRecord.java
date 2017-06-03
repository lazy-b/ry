package cn.fenix.ry.entity;

import java.io.Serializable;
import java.util.Date;

public class RawRecord implements Serializable{
	private static final long serialVersionUID = 2743209351535250134L;
		private String rowRecordId;
		private String pickingId;
		private String materialReturnId;
		private String materialStockId;
		private String orderNo;
		private String productName;
		private String orderAmount;
		private String materialModel;
		private String unit;
		private Double expectAmount;
		private Double stockAmount;
		private Double requestAmount;
		private Date   pickingDate;
		private Double pickingAmount;
		private Double backAmount;
		private Date backDate;
		private Double pickingTotal;
		private Double unclaimedAmount;
		private Double unitPrice;
		private Double weight;
		private Double amount;
		private String remarks;
		private Date created;
		private Date updated;
		public String getRowRecordId() {
			return rowRecordId;
		}
		public void setRowRecordId(String rowRecordId) {
			this.rowRecordId = rowRecordId;
		}
		public String getPickingId() {
			return pickingId;
		}
		public void setPickingId(String pickingId) {
			this.pickingId = pickingId;
		}
		public String getMaterialReturnId() {
			return materialReturnId;
		}
		public void setMaterialReturnId(String materialReturnId) {
			this.materialReturnId = materialReturnId;
		}
		public String getMaterialStockId() {
			return materialStockId;
		}
		public void setMaterialStockId(String materialStockId) {
			this.materialStockId = materialStockId;
		}
		public String getOrderNo() {
			return orderNo;
		}
		public void setOrderNo(String orderNo) {
			this.orderNo = orderNo;
		}
		public String getProductName() {
			return productName;
		}
		public void setProductName(String productName) {
			this.productName = productName;
		}
		public String getOrderAmount() {
			return orderAmount;
		}
		public void setOrderAmount(String orderAmount) {
			this.orderAmount = orderAmount;
		}
		public String getMaterialModel() {
			return materialModel;
		}
		public void setMaterialModel(String materialModel) {
			this.materialModel = materialModel;
		}
		public String getUnit() {
			return unit;
		}
		public void setUnit(String unit) {
			this.unit = unit;
		}
		public Double getExpectAmount() {
			return expectAmount;
		}
		public void setExpectAmount(Double expectAmount) {
			this.expectAmount = expectAmount;
		}
		public Double getStockAmount() {
			return stockAmount;
		}
		public void setStockAmount(Double stockAmount) {
			this.stockAmount = stockAmount;
		}
		public Double getRequestAmount() {
			return requestAmount;
		}
		public void setRequestAmount(Double requestAmount) {
			this.requestAmount = requestAmount;
		}
		public Date getPickingDate() {
			return pickingDate;
		}
		public void setPickingDate(Date pickingDate) {
			this.pickingDate = pickingDate;
		}
		public Double getPickingAmount() {
			return pickingAmount;
		}
		public void setPickingAmount(Double pickingAmount) {
			this.pickingAmount = pickingAmount;
		}
		public Double getBackAmount() {
			return backAmount;
		}
		public void setBackAmount(Double backAmount) {
			this.backAmount = backAmount;
		}
		public Date getBackDate() {
			return backDate;
		}
		public void setBackDate(Date backDate) {
			this.backDate = backDate;
		}
		public Double getPickingTotal() {
			return pickingTotal;
		}
		public void setPickingTotal(Double pickingTotal) {
			this.pickingTotal = pickingTotal;
		}
		public Double getUnclaimedAmount() {
			return unclaimedAmount;
		}
		public void setUnclaimedAmount(Double unclaimedAmount) {
			this.unclaimedAmount = unclaimedAmount;
		}
		public Double getUnitPrice() {
			return unitPrice;
		}
		public void setUnitPrice(Double unitPrice) {
			this.unitPrice = unitPrice;
		}
		public Double getWeight() {
			return weight;
		}
		public void setWeight(Double weight) {
			this.weight = weight;
		}
		public Double getAmount() {
			return amount;
		}
		public void setAmount(Double amount) {
			this.amount = amount;
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
