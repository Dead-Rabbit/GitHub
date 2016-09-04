//Random?
using UnityEngine;
using System.Collections;
public enum enemType
{
	enem1,enem2
}
public enum enemMoveType//敌人巡逻状态
{
	STAND,
	WALK,
	TURNAROUND
}
public enum enemAttactType
{
	RUN,
	ATTACK
}
public class EmeAI : MonoBehaviour {
	
	public GameObject player;
	public enemType enemyType;
	public float thinkDurningTime = 3.0f;//AI思考间隔时间
	public float aiMoveSpeed = 0.04f;

	private int state = 1;
	private float lastThinkTime = 0.0f;
	private int rotateNumber = 0;
	private Vector3 walkPosition;
	private NavMeshAgent agent;

	private const int enemMoveSTAND = 1;
	private const int enemMoveWALK = 2;
	private const int enemMoveTURNAROUND = 3;
	private const int enemAttactRUN = 4;
	private const int enemAttactATTACK = 5;

	// Use this for initialization
	void Start () {
		lastThinkTime = 0.0f;
		agent = gameObject.GetComponent<NavMeshAgent> ();
	}
	
	// Update is called once per frame
	void Update () {
		switch (enemyType) {
		case enemType.enem1:
			enem1Action ();
			break;
		case enemType.enem2:
			enem2Action ();
			break;
		}
	}
	void enem1Action(){//enem1 的行为，当距离小于10时，一直看着player
		if(Vector3.Distance(player.transform.position,this.transform.position) <= 10)
		{
			this.transform.LookAt(player.transform);
		}
	}
	void enem2Action(){//enem2 的行为，思考，巡逻和跑步攻击
		if (isThinking ()) {//如果正在思考（意味着并没有受到主角的打扰）
			Debug.Log("Let me think");
			aiThinkResult();
		} else {
			updateEnemyActivity ();//用来更新当前的行为
		}
	}
	bool isThinking(){
		if (Time.time - lastThinkTime > thinkDurningTime) {
			lastThinkTime = Time.time;
			return true;
		}
		return false;
	}
	void aiThinkResult(){
		int randomNumber = getRandom (3);
		switch(randomNumber){
		case 0:
			setStatement(enemMoveSTAND);
			break;
		case 1:
			setStatement(enemMoveTURNAROUND);
			break;
		case 2:
			walkPosition = getWalkPosition (1);
			setStatement(enemMoveWALK);
			break;
		}
	}
	void setStatement(int newState){
		if (newState == state)
			return;
		state = newState;
		string animaName = "";
		switch(newState){
		case enemMoveSTAND:
			animaName = "stand";
			break;
		case enemMoveTURNAROUND:
			rotateNumber = getRandom (4);
			animaName = "turnaround";
			break;
		case enemMoveWALK:
			animaName = "walk"+walkPosition;
			break;
		case enemAttactRUN:
			animaName = "run";
			break;
		case enemAttactATTACK:
			animaName = "attack";
			break;
		}
		//进行动画的播放
//		if (!this.animation.IsPlaying (animaName)) {
//			this.animation.Play(animName);
//		}
	}
	void updateEnemyActivity(){
		float distince = Vector3.Distance (player.transform.position,this.transform.position);
		if (distince <= 10) {
			if (distince <= 3) {
				//对主角进行攻击
				setStatement(enemAttactATTACK);
			} else {
				//对主角进行追击
				setStatement(enemAttactRUN);
			}
		} else {
			if (state == enemAttactRUN || state == enemAttactATTACK) {
				//当对主角进行攻击或者追击的时候距离大于10时，再次进入巡逻阶段
				aiThinkResult();
			}
		}
		Vector3 forwardVector ;
		switch(state){
		case  enemMoveSTAND:
			break;
		case enemMoveTURNAROUND:
			transform.rotation = Quaternion.Lerp (transform.rotation, Quaternion.Euler(0,rotateNumber * 90,0),  Time.deltaTime * 1);
			break;
		case enemMoveWALK:
			
			agent.SetDestination (walkPosition);
			break;
		case enemAttactRUN:
			transform.LookAt (player.transform.position);
			agent.SetDestination(player.transform.position);
			break;
		case enemAttactATTACK:
			transform.LookAt (player.transform.position);
			break;
		}
	}
	int getRandom(int count){
		int res = new System.Random().Next(count);
		Debug.Log ("random number is "+res);
		return res;
	}
	Vector3 getWalkPosition(int count){
		float x = getRandom (count) - count/2;
		float z = getRandom (count) - count/2;
		return new Vector3 (transform.position.x+x,1.48f,transform.position.z+z);
	}
}
