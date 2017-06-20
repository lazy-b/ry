package cn.fenix.ry.entity.vo;

import java.io.Serializable;
import java.sql.Date;
/**
 * 订单信息表
 * @author wenye
 * @Time 2017-6-4
 */
public class OrderInformationVo implements Serializable{
	private static final long serialVersionUID = 2726342261326989546L;
	   private String orderInformationId; //订单表Id
	   private String orderDate;       //下单日期;
	   private String requiredDate;    //要求日期;
	   private String orderNo;         //订单号;
	   private String materialCoding;  //物料编码;
	   private String productName;     //产品名称;
	   private Integer orderAmount;    //订单数;
	   private Integer spareParts;     //备品;
	   private Integer stockAmount;    //库存数;
	   private Integer planAmount;     //计划数;
	   private String materialModel;   //规格型号;
	   private String purchaseRequirement;//特殊要求;
	   private Date replyDate;          //回复交期
	   private Integer orderStatus;     //订单状态;
	   private Integer orderType;        //订单类型;
	   private String exceptionReason;    //异常原因;
	   private Double price;              //单价;
	   private String remark;			  //备注;
	public OrderInformationVo(String orderInformationId, String orderDate, String requiredDate, String orderNo,
			String materialCoding, String productName, Integer orderAmount, Integer spareParts, Integer stockAmount,
			Integer planAmount, String materialModel, String purchaseRequirement, Date replyDate, Integer orderStatus,
			Integer orderType, String exceptionReason, Double price, String remark) {
		super();
		this.orderInformationId = orderInformationId;
		this.orderDate = orderDate;
		this.requiredDate = requiredDate;
		this.orderNo = orderNo;
		this.materialCoding = materialCoding;
		this.productName = productName;
		this.orderAmount = orderAmount;
		this.spareParts = spareParts;
		this.stockAmount = stockAmount;
		this.planAmount = planAmount;
		this.materialModel = materialModel;
		this.purchaseRequirement = purchaseRequirement;
		this.replyDate = replyDate;
		this.orderStatus = orderStatus;
		this.orderType = orderType;
		this.exceptionReason = exceptionReason;
		this.price = price;
		this.remark = remark;
	}
	public String getOrderInformationId() {
		return orderInformationId;
	}
	public void setOrderInformationId(String orderInformationId) {
		this.orderInformationId = orderInformationId;
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
	public Integer getPlanAmount() {
		return planAmount;
	}
	public void setPlanAmount(Integer planAmount) {
		this.planAmount = planAmount;
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
	public Date getReplyDate() {
		return replyDate;
	}
	public void setReplyDate(Date replyDate) {
		this.replyDate = replyDate;
	}
	public Integer getOrderStatus() {
		return orderStatus;
	}
	public void setOrderStatus(Integer orderStatus) {
		this.orderStatus = orderStatus;
	}
	public Integer getOrderType() {
		return orderType;
	}
	public void setOrderType(Integer orderType) {
		this.orderType = orderType;
	}
	public String getExceptionReason() {
		return exceptionReason;
	}
	public void setExceptionReason(String exceptionReason) {
		this.exceptionReason = exceptionReason;
	}
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	@Override
	public String toString() {
		return "OrderInformation [orderInformationId=" + orderInformationId + ", orderDate=" + orderDate
				+ ", requiredDate=" + requiredDate + ", orderNo=" + orderNo + ", materialCoding=" + materialCoding
				+ ", productName=" + productName + ", orderAmount=" + orderAmount + ", spareParts=" + spareParts
				+ ", stockAmount=" + stockAmount + ", planAmount=" + planAmount + ", materialModel=" + materialModel
				+ ", purchaseRequirement=" + purchaseRequirement + ", replyDate=" + replyDate + ", orderStatus="
				+ orderStatus + ", orderType=" + orderType + ", exceptionReason=" + exceptionReason + ", price=" + price
				+ ", remark=" + remark + "]";
	}
	   
}
