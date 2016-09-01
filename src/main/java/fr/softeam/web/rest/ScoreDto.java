package fr.softeam.web.rest;

import java.io.Serializable;

public class ScoreDto  implements Serializable{
	private double score;

	public double getScore() {
		return score;
	}

	public void setScore(double score) {
		this.score = score;
	}

	@Override
	public String toString() {
		return "ScoreDto [score=" + score + "]";
	}

	public ScoreDto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ScoreDto(double score) {
		super();
		this.score = score;
	}
	
	
	
}
