package Imp;
import JDBCHelpr.JdbcHelper;
import Dao.*;
import Interf.*;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
public class quesImp implements quesInterf {
	Connection conn = null;
	JdbcHelper jdbcHelper = null;
	public quesImp(){
		jdbcHelper = new JdbcHelper();
		conn = jdbcHelper.getConn();
	}
	@Override
	public List<QuesDao> retById(int id) {
		List<QuesDao> list = new ArrayList<QuesDao>();
		String sqlString = "select * from questionbank where id = ?";
		try{
			ResultSet res = null;
			PreparedStatement psta = conn.prepareStatement(sqlString);
			psta.setInt(1, id);
			res = psta.executeQuery();
			while(res.next()){
				QuesDao dao = new QuesDao();
				dao.setAnswer(res.getString("answer"));
				dao.setId(res.getInt("id"));
				dao.setQuestion(res.getString("question"));
				dao.setTypeId(res.getInt("typeId"));
				list.add(dao);
			}
		}catch (Exception e){
			e.printStackTrace();
		}
		return list;
	}
	@Override
	public boolean insertQues(int id,JSONObject json) {
		// TODO Auto-generated method stub
		boolean ifSucc = false;
		String sqlString = "insert into questionbank(id,question,typeId,answer) values (?,?,?,?)";
		try{
			PreparedStatement psta = conn.prepareStatement(sqlString);
			psta.setInt(1,id);
			psta.setString(2, json.getString("question"));
			psta.setInt(3, json.getInt("typeId"));
			psta.setString(4, getAnswer(json));
			psta.executeUpdate();
			System.out.println("insert into questionbank "+json.getString("question"));
			ifSucc = true;
		}catch (Exception e){
			e.printStackTrace();
		}
		return ifSucc;
	}
/********辅助方法********/
	private String getAnswer(JSONObject json){
		String answers = "";
		String res = "";
		answers = json.getString("answer").substring(1, json.getString("answer").length()-1);
		String items[] = answers.split(",");
		for(int i = 0;i < items.length;i++){
			res += items[i].substring(1,items[i].length()-1);
			if(i != items.length-1){
				res += ",";
			}
		}
		System.out.println(res);
		return res;
	}
	public static void main(String[] args) {
		quesImp imp = new quesImp();
		String jsontest = "{answer:['title1','title2']}";
		JSONObject json = new JSONObject(jsontest);
		imp.getAnswer(json);
	}
}
