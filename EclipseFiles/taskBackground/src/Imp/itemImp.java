package Imp;
import java.util.ArrayList;
import java.util.List;
import java.sql.*;

import net.sf.json.JSONObject;
import Dao.*;
import Interf.itemInterf;
import Interf.itemInterf.*;
import JDBCHelpr.JdbcHelper;
import Imp.*;

public class itemImp implements itemInterf {
	JdbcHelper helper = null;
	Connection conn = null;
	public itemImp(){
		helper = new JdbcHelper();
		conn = helper.getConn();
	}
	@Override
	public List<itemDao> returnAll() {
		// TODO Auto-generated method stub
		String sqlString = "select * from items";
		List<itemDao> list = new ArrayList<itemDao>();
		try{
			ResultSet res = null;
			Statement sta = conn.createStatement();
			res = sta.executeQuery(sqlString);
			while(res.next()){
				itemDao dao = new itemDao();
				dao.setId(res.getInt("id"));
				dao.setState(res.getString("state"));
				dao.setTime(res.getString("time").substring(0,10));
				dao.setTitle(res.getString("title"));
				list.add(dao);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return list;
	}
	public itemDao retById(int id){
		itemDao dao = new itemDao();
		String sqlString = "select * from items where id = ?";
		try{
			ResultSet res = null;
			PreparedStatement psta = conn.prepareStatement(sqlString);
			psta.setInt(1, id);
			res = psta.executeQuery();
			while(res.next()){
				dao.setId(res.getInt("id"));
				dao.setState(res.getString("state"));
				dao.setTime(res.getString("time").substring(0,10));
				dao.setTitle(res.getString("title"));
			}
		}
		catch(Exception e){
			e.printStackTrace();
		}
		return dao;
	}
	@Override
	public boolean insertItem(JSONObject json) {
		// TODO Auto-generated method stub
		boolean ifSucc = false;
		int id = 0;
		quesImp quesimp = new quesImp();
		String sqlString = "insert into items(id,title,time,state) values (?,?,?,'未发布')";
		try{
			PreparedStatement psta = conn.prepareStatement(sqlString);
			id = getNewId();
			psta.setInt(1,id);
			psta.setString(2, json.getString("title"));
			psta.setString(3, json.getString("time"));
			psta.executeUpdate();
			System.out.println("insert into items "+json.getString("title"));
			//进行逐条插入 （问题信息）
			for(int i = 0;i < json.getJSONArray("questionbank").length();i++){
				quesimp.insertQues(id,json.getJSONArray("questionbank").getJSONObject(i));
			}
			ifSucc = true;
		}catch (Exception e){
			e.printStackTrace();
		}
		return ifSucc;
	}
/**** 辅助方法 *****/
	private int getNewId(){
		int id = 0;
		String sqlString = "select * from items order by id desc";
		try{
			ResultSet res = null;
			Statement sta = conn.createStatement();
			res = sta.executeQuery(sqlString);
			while(res.next()){
				id = res.getInt("id");
				break;
			}
			id++;
		}catch (Exception e){
			e.printStackTrace();
		}
		return id;
	}
	public static void main(String[] args) {
		itemImp imp = new itemImp();
//		String jsonString = "{'title':'点击输入标题1','time':'2016-1-3','questionbank':"
//				+ "[{'question':'问题1','typeId':1,'answer':['答案1','答案2']},"
//				+ "{'question':'问题2','typeId':2,'answer':['答案3','答案4']},"
//				+ "{'question':'问题3','typeId':3,'answer':['答案5','答案6']}"
//				+ "]}";
//		JSONObject json = new JSONObject(jsonString);
//		imp.insertItem(json);
		for(itemDao dao : imp.returnAll()){
			System.out.println(dao.getTitle());
		}
	}
}
