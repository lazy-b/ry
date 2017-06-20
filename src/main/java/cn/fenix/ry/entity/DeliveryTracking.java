package cn.fenix.ry.entity;

import java.io.Serializable;
import java.util.Date;
/**
 * 交货跟踪表
 * @author wenye
 * @Time 2017-6-4
 */
public class DeliveryTracking implements Serializable {
	private static final long serialVersionUID = 2048088272853579763L;
	   
	   private String deliveryRecordId; //交货跟踪表Id
	   private String prDeliveryId;     //交货表Id
	   private String prPickingId;      //领料表Id
	   private String prReturnId;       //退料表Id
	   private String orderNo;          //订单号
	   private String orderDate;          //下单日期
	   private String deliveryDate;	    //交货日期
	   private Integer orderAmount;     //订单数量
	   private String productName;      //产品名称
	   private String materialCoding;   //物料编码
	   private Integer deliveryAmount;  //送货数量
	   private Integer returnAmount;    //退货数量
	   private Integer badAmount;       //制程不良数
	   private Integer balanceAmount;   //未交数
	   private Double unitPrice;        //单价
	   private Double unpaidMoney;      //未交金额
	   private Double orderMoney;       //订单金额
	   private String remarks;          //备注
	   private Date created;            //创建日期
	   private Date updated;            //修改日期
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
	public String getOrderDate() {
		return orderDate;
	}
	public void setOrderDate(String orderDate) {
		this.orderDate = orderDate;
	}
	public String getDeliveryDate() {
		return deliveryDate;
	}
	public void setDeliveryDate(String deliveryDate) {
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
	public DeliveryTracking(String deliveryRecordId, String prDeliveryId, String prPickingId, String prReturnId,
			String orderNo, String orderDate, String deliveryDate, Integer orderAmount, String productName,
			String materialCoding, Integer deliveryAmount, Integer returnAmount, Integer badAmount,
			Integer balanceAmount, Double unitPrice, Double unpaidMoney, Double orderMoney, String remarks,
			Date created, Date updated) {
		super();
		this.deliveryRecordId = deliveryRecordId;
		this.prDeliveryId = prDeliveryId;
		this.prPickingId = prPickingId;
		this.prReturnId = prReturnId;
		this.orderNo = orderNo;
		this.orderDate = orderDate;
		this.deliveryDate = deliveryDate;
		this.orderAmount = orderAmount;
		this.productName = productName;
		this.materialCoding = materialCoding;
		this.deliveryAmount = deliveryAmount;
		this.returnAmount = returnAmount;
		this.badAmount = badAmount;
		this.balanceAmount = balanceAmount;
		this.unitPrice = unitPrice;
		this.unpaidMoney = unpaidMoney;
		this.orderMoney = orderMoney;
		this.remarks = remarks;
		this.created = created;
		this.updated = updated;
	}
	public DeliveryTracking() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "DeliveryTracking [deliveryRecordId=" + deliveryRecordId + ", prDeliveryId=" + prDeliveryId
				+ ", prPickingId=" + prPickingId + ", prReturnId=" + prReturnId + ", orderNo=" + orderNo
				+ ", orderDate=" + orderDate + ", deliveryDate=" + deliveryDate + ", orderAmount=" + orderAmount
				+ ", productName=" + productName + ", materialCoding=" + materialCoding + ", deliveryAmount="
				+ deliveryAmount + ", returnAmount=" + returnAmount + ", badAmount=" + badAmount + ", balanceAmount="
				+ balanceAmount + ", unitPrice=" + unitPrice + ", unpaidMoney=" + unpaidMoney + ", orderMoney="
				+ orderMoney + ", remarks=" + remarks + ", created=" + created + ", updated=" + updated + "]";
	}
	
	
}
