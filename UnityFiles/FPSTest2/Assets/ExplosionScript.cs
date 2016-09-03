using UnityEngine;
using System.Collections;

public class ExplosionScript : MonoBehaviour {
	public float desTime = 2.0f;
	// Use this for initialization
	void Start () {
		Destroy (gameObject,desTime);
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
