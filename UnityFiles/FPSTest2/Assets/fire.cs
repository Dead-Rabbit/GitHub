using UnityEngine;
using System.Collections;
using System.Threading;
public class fire : MonoBehaviour {
	public float shootDurningTime;
	private float shootTime = 0.0f;
	private int shootTimePara = Animator.StringToHash ("durningTime");
	Animator anima;

	private int ifShootInputNumber = Animator.StringToHash ("ifShoot");
	// Use this for initialization
	void Start () {
		anima = gameObject.GetComponent<Animator> ();
		anima.SetFloat (shootTimePara,shootTime);
	}
	
	// Update is called once per frame
	void Update () {
		shootTime = anima.GetFloat ("durningTime");
		if (shootTime > 0) {
			shootTime -= Time.deltaTime;
			anima.SetFloat (shootTimePara,shootTime);
		}
	}
	void gunFire(){
		anima.SetFloat (shootTimePara,0.5f);
	}
}
