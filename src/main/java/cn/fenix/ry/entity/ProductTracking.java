package cn.fenix.ry.entity;

import java.io.Serializable;
import java.util.Date;
/**
 * 生产跟踪表
 * @author wenye
 * @Time 2017-6-4
 */
public class ProductTracking implements Serializable {
		private static final long serialVersionUID = 6026233819199187378L;
		private String productTackingId; //生产跟踪Id;
		private String dailyOutputId;    //日产表Id;
		private String groups;           //组别
		private Date dates;              //日期
		private String shift;            //班次
		private String machineNumber;    //机床号
		private String orderNo;          //订单号
		private String productName;      //产品名称
		private String process;          //工序
		private Integer planeAmount;     //计划数量
		private Integer inventoryAmount; //库存数量
		private Integer totalAmount;     //良品数
		private Integer scrapAmount;     //报废数
		private Integer waitRepairAmount; //待返修数
		private Integer repairAmount;     //返修数
		private Integer balanceAmount;    //未生产数
		private Double processRate;       //工序完成率
		private Integer status;           //状态
		private Integer processCompletion; //工序完成确认
		private Date created;              //创建日期
		private Date updated;              //修改日期
		public String getProductTackingId() {
			return productTackingId;
		}
		public void setProductTackingId(String productTackingId) {
			this.productTackingId = productTackingId;
		}
		public String getDailyOutputId() {
			return dailyOutputId;
		}
		public void setDailyOutputId(String dailyOutputId) {
			this.dailyOutputId = dailyOutputId;
		}
		public String getGroups() {
			return groups;
		}
		public void setGroups(String groups) {
			this.groups = groups;
		}
		public Date getDates() {
			return dates;
		}
		public void setDates(Date dates) {
			this.dates = dates;
		}
		public String getShift() {
			return shift;
		}
		public void setShift(String shift) {
			this.shift = shift;
		}
		public String getMachineNumber() {
			return machineNumber;
		}
		public void setMachineNumber(String machineNumber) {
			this.machineNumber = machineNumber;
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
		public String getProcess() {
			return process;
		}
		public void setProcess(String process) {
			this.process = process;
		}
		public Integer getPlaneAmount() {
			return planeAmount;
		}
		public void setPlaneAmount(Integer planeAmount) {
			this.planeAmount = planeAmount;
		}
		public Integer getInventoryAmount() {
			return inventoryAmount;
		}
		public void setInventoryAmount(Integer inventoryAmount) {
			this.inventoryAmount = inventoryAmount;
		}
		public Integer getTotalAmount() {
			return totalAmount;
		}
		public void setTotalAmount(Integer totalAmount) {
			this.totalAmount = totalAmount;
		}
		public Integer getScrapAmount() {
			return scrapAmount;
		}
		public void setScrapAmount(Integer scrapAmount) {
			this.scrapAmount = scrapAmount;
		}
		public Integer getWaitRepairAmount() {
			return waitRepairAmount;
		}
		public void setWaitRepairAmount(Integer waitRepairAmount) {
			this.waitRepairAmount = waitRepairAmount;
		}
		public Integer getRepairAmount() {
			return repairAmount;
		}
		public void setRepairAmount(Integer repairAmount) {
			this.repairAmount = repairAmount;
		}
		public Integer getBalanceAmount() {
			return balanceAmount;
		}
		public void setBalanceAmount(Integer balanceAmount) {
			this.balanceAmount = balanceAmount;
		}
		public Double getProcessRate() {
			return processRate;
		}
		public void setProcessRate(Double processRate) {
			this.processRate = processRate;
		}
		public Integer getStatus() {
			return status;
		}
		public void setStatus(Integer status) {
			this.status = status;
		}
		public Integer getProcessCompletion() {
			return processCompletion;
		}
		public void setProcessCompletion(Integer processCompletion) {
			this.processCompletion = processCompletion;
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
