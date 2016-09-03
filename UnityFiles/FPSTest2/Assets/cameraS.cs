using UnityEngine;
using System.Collections;

public class cameraS : MonoBehaviour {

	// Use this for initialization
	public float shootDamage = 10.0f;

	public Texture2D texture;
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		if (Input.GetMouseButtonDown (0)) {
			Debug.Log ("let the mouse down ");
			Ray cameraRay = Camera.main.ScreenPointToRay (new Vector2(Screen.width/2,Screen.height/2));
			RaycastHit hitInfo;
			if(Physics.Raycast(cameraRay,out hitInfo)){
//				Debug.DrawLine(cameraRay.origin,hitInfo.point,Color.red);
				Debug.DrawLine(transform.position,hitInfo.point,Color.red);
				if (hitInfo.transform.tag.Equals ("Eme")) {
					Debug.Log ("You hite an eme："+hitInfo.collider.gameObject);
					hitInfo.collider.gameObject.SendMessage ("beShoot",shootDamage);
				}
			}
		}
	}
	void OnGUI(){
//		Rect  rect = new Rect(Input.mousePosition.x - (texture.width >> 1),
//			Screen.height - Input.mousePosition.y - (texture.height >> 1),
//			texture.width, texture.height);
		Rect  rect = new Rect(Screen.width/2-Screen.width/30,
			Screen.height/2-Screen.width/30,
			Screen.width/30,Screen.width/30);
		GUI.DrawTexture(rect, texture);
	}
}
