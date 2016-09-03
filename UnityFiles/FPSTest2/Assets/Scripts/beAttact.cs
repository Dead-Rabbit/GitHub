using UnityEngine;
using System.Collections;

public class beAttact : MonoBehaviour {
	float totalHealth = 100;
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	void beShoot(float damagePower){
		totalHealth = totalHealth - damagePower;
		Debug.Log ("let my health down "+damagePower+" and I just have "+totalHealth+"HP");
		if (totalHealth <= 0) {
			Destroy (gameObject.transform.GetComponent<Collider>());
			Destroy (gameObject,2.0f);
			Debug.Log ("shit!I will die!!!Oh…");
		}
	}
}
