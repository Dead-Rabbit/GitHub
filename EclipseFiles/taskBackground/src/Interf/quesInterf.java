package Interf;
import java.util.List;

import net.sf.json.JSONObject;
import Dao.*;
public interface quesInterf {
	List<QuesDao> retById(int id);
	boolean insertQues(int id,JSONObject json);
}
