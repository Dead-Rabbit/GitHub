using UnityEngine;
using System.Collections;

public class shootAction : MonoBehaviour {
	public Rigidbody projectile ;
	public float speed = 5.0f;

	// Use this for initialization
	void Start () {
		
	}
	// Update is called once per frame
	void Update () {
		if(Input.GetMouseButtonDown(0)){
			Rigidbody instantiatedProjectile = Instantiate (projectile,transform.position,transform.rotation) as Rigidbody;
			instantiatedProjectile.velocity = transform.TransformDirection (new Vector3(0f,0f,speed));
			Physics.IgnoreCollision ( instantiatedProjectile.GetComponent<Collider>() , transform.root.GetComponent<Collider>());
			Physics.IgnoreCollision ( instantiatedProjectile.GetComponent<Collider>() , transform.GetComponent<Collider>());

		}
	}
}
