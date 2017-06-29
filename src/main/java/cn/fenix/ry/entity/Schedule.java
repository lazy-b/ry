package cn.fenix.ry.entity;

import java.io.Serializable;
import java.util.Date;

public class Schedule implements Serializable{
	private static final long serialVersionUID = -5480431528504342938L;
	   private String id;
	   private String orderNo;                //订单号
	   private String productName;            //产品名称
	   private Integer batch;                 //批次
	   private Date reciverOrder;             //接收订单
	   private Date planPrductTime;           //计划生产开始时间
	   private Integer productStatus;         //生产开始状态
	   private Date planProductFinish;        //计划生产完成时间
	   private Integer productFinishStatus;   //生产完成状态
	   private Date planOrderFinish;          //订单计划完成时间
	   private Integer orderFinishStatus;     //订单完成状态
	public Schedule() {
		super();
	}
	public Schedule(String id, String orderNo, String productName, Integer batch, Date reciverOrder,
			Date planPrductTime, Integer productStatus, Date planProductFinish, Integer productFinishStatus,
			Date planOrderFinish, Integer orderFinishStatus) {
		super();
		this.id = id;
		this.orderNo = orderNo;
		this.productName = productName;
		this.batch = batch;
		this.reciverOrder = reciverOrder;
		this.planPrductTime = planPrductTime;
		this.productStatus = productStatus;
		this.planProductFinish = planProductFinish;
		this.productFinishStatus = productFinishStatus;
		this.planOrderFinish = planOrderFinish;
		this.orderFinishStatus = orderFinishStatus;
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
	public Integer getBatch() {
		return batch;
	}
	public void setBatch(Integer batch) {
		this.batch = batch;
	}
	public Date getReciverOrder() {
		return reciverOrder;
	}
	public void setReciverOrder(Date reciverOrder) {
		this.reciverOrder = reciverOrder;
	}
	public Date getPlanPrductTime() {
		return planPrductTime;
	}
	public void setPlanPrductTime(Date planPrductTime) {
		this.planPrductTime = planPrductTime;
	}
	public Integer getProductStatus() {
		return productStatus;
	}
	public void setProductStatus(Integer productStatus) {
		this.productStatus = productStatus;
	}
	public Date getPlanProductFinish() {
		return planProductFinish;
	}
	public void setPlanProductFinish(Date planProductFinish) {
		this.planProductFinish = planProductFinish;
	}
	public Integer getProductFinishStatus() {
		return productFinishStatus;
	}
	public void setProductFinishStatus(Integer productFinishStatus) {
		this.productFinishStatus = productFinishStatus;
	}
	public Date getPlanOrderFinish() {
		return planOrderFinish;
	}
	public void setPlanOrderFinish(Date planOrderFinish) {
		this.planOrderFinish = planOrderFinish;
	}
	public Integer getOrderFinishStatus() {
		return orderFinishStatus;
	}
	public void setOrderFinishStatus(Integer orderFinishStatus) {
		this.orderFinishStatus = orderFinishStatus;
	}
}
