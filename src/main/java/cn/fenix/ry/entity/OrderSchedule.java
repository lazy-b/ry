package cn.fenix.ry.entity;

import java.io.Serializable;
import java.util.Date;

public class OrderSchedule implements Serializable {
	private static final long serialVersionUID = 1L;
	private String id;
	private String orderNo;
	private String productName;
	private String placeOrder;
	private java.util.Date pPlanetime;
	private java.util.Date pFacttime;
	private String pRemarks;
	private String picking;
	private java.util.Date pickPlanetime;
	private java.util.Date pickFacttime;
	private String pickRemarks;
	private String arrange;
	private java.util.Date arrangePlanetime;
	private java.util.Date arrangeFacttime;
	private String arrangeRemarks;
	private String product;
	private java.util.Date proPlanetime;
	private java.util.Date proFacttime;
	private String proRemarks;
	private String delivery;
	private java.util.Date deliveryPlanetime;
	private java.util.Date deliveryFacttime;
	private String deliveryRemarks;

	public OrderSchedule() {
		super();
	}

	public OrderSchedule(String id, String orderNo, String productName, String placeOrder, Date pPlanetime,
			Date pFacttime, String pRemarks, String picking, Date pickPlanetime, Date pickFacttime, String pickRemarks,
			String arrange, Date arrangePlanetime, Date arrangeFacttime, String arrangeRemarks, String product,
			Date proPlanetime, Date proFacttime, String proRemarks, String delivery, Date deliveryPlanetime,
			Date deliveryFacttime, String deliveryRemarks) {
		super();
		this.id = id;
		this.orderNo = orderNo;
		this.productName = productName;
		this.placeOrder = placeOrder;
		this.pPlanetime = pPlanetime;
		this.pFacttime = pFacttime;
		this.pRemarks = pRemarks;
		this.picking = picking;
		this.pickPlanetime = pickPlanetime;
		this.pickFacttime = pickFacttime;
		this.pickRemarks = pickRemarks;
		this.arrange = arrange;
		this.arrangePlanetime = arrangePlanetime;
		this.arrangeFacttime = arrangeFacttime;
		this.arrangeRemarks = arrangeRemarks;
		this.product = product;
		this.proPlanetime = proPlanetime;
		this.proFacttime = proFacttime;
		this.proRemarks = proRemarks;
		this.delivery = delivery;
		this.deliveryPlanetime = deliveryPlanetime;
		this.deliveryFacttime = deliveryFacttime;
		this.deliveryRemarks = deliveryRemarks;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
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

	public String getPlaceOrder() {
		return placeOrder;
	}

	public void setPlaceOrder(String placeOrder) {
		this.placeOrder = placeOrder;
	}

	public java.util.Date getpPlanetime() {
		return pPlanetime;
	}

	public void setpPlanetime(java.util.Date pPlanetime) {
		this.pPlanetime = pPlanetime;
	}

	public java.util.Date getpFacttime() {
		return pFacttime;
	}

	public void setpFacttime(java.util.Date pFacttime) {
		this.pFacttime = pFacttime;
	}

	public String getpRemarks() {
		return pRemarks;
	}

	public void setpRemarks(String pRemarks) {
		this.pRemarks = pRemarks;
	}

	public String getPicking() {
		return picking;
	}

	public void setPicking(String picking) {
		this.picking = picking;
	}

	public java.util.Date getPickPlanetime() {
		return pickPlanetime;
	}

	public void setPickPlanetime(java.util.Date pickPlanetime) {
		this.pickPlanetime = pickPlanetime;
	}

	public java.util.Date getPickFacttime() {
		return pickFacttime;
	}

	public void setPickFacttime(java.util.Date pickFacttime) {
		this.pickFacttime = pickFacttime;
	}

	public String getPickRemarks() {
		return pickRemarks;
	}

	public void setPickRemarks(String pickRemarks) {
		this.pickRemarks = pickRemarks;
	}

	public String getArrange() {
		return arrange;
	}

	public void setArrange(String arrange) {
		this.arrange = arrange;
	}

	public java.util.Date getArrangePlanetime() {
		return arrangePlanetime;
	}

	public void setArrangePlanetime(java.util.Date arrangePlanetime) {
		this.arrangePlanetime = arrangePlanetime;
	}

	public java.util.Date getArrangeFacttime() {
		return arrangeFacttime;
	}

	public void setArrangeFacttime(java.util.Date arrangeFacttime) {
		this.arrangeFacttime = arrangeFacttime;
	}

	public String getArrangeRemarks() {
		return arrangeRemarks;
	}

	public void setArrangeRemarks(String arrangeRemarks) {
		this.arrangeRemarks = arrangeRemarks;
	}

	public String getProduct() {
		return product;
	}

	public void setProduct(String product) {
		this.product = product;
	}

	public java.util.Date getProPlanetime() {
		return proPlanetime;
	}

	public void setProPlanetime(java.util.Date proPlanetime) {
		this.proPlanetime = proPlanetime;
	}

	public java.util.Date getProFacttime() {
		return proFacttime;
	}

	public void setProFacttime(java.util.Date proFacttime) {
		this.proFacttime = proFacttime;
	}

	public String getProRemarks() {
		return proRemarks;
	}

	public void setProRemarks(String proRemarks) {
		this.proRemarks = proRemarks;
	}

	public String getDelivery() {
		return delivery;
	}

	public void setDelivery(String delivery) {
		this.delivery = delivery;
	}

	public java.util.Date getDeliveryPlanetime() {
		return deliveryPlanetime;
	}

	public void setDeliveryPlanetime(java.util.Date deliveryPlanetime) {
		this.deliveryPlanetime = deliveryPlanetime;
	}

	public java.util.Date getDeliveryFacttime() {
		return deliveryFacttime;
	}

	public void setDeliveryFacttime(java.util.Date deliveryFacttime) {
		this.deliveryFacttime = deliveryFacttime;
	}

	public String getDeliveryRemarks() {
		return deliveryRemarks;
	}

	public void setDeliveryRemarks(String deliveryRemarks) {
		this.deliveryRemarks = deliveryRemarks;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}
