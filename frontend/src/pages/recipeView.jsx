import React from 'react';
import RecipeThumbnail from '../components/Thumbnail';
import SearchBar from '../components/SearchBar';
import NavBar from '../components/NavBar';
import styles from '../styles/recipeOverview.module.css';

export default function RecipeView() {
  return (
    <div id="page">
      <NavBar />
      <div className={styles.outerContainer}>
        <div className={styles.recipeContainer}>
          <SearchBar />
          <RecipeThumbnail
            title="Kylling cacciatore"
            picture="https://images.matprat.no/d3u6fng42x-normal/1000"
            duration="40–60 min"
            rating="5"
            description="Vi blir vel aldri lei av alt-i ett-gryter! Kylling cacciatore, som kan oversettes til jegerens kyllinggryte, er en slik deilig, varmende gryte som nesten gjør seg selv.  Server den med deilig ferskt brød for å få med hver dråpe av sausen."
          />
          <RecipeThumbnail
            title="Skrei med tomat- og basilikumsaus"
            duration="20–40 min"
            rating="4"
            picture="https://images.matprat.no/5dyvcdgb7q-normal/710"
            description="Februar og mars er høysesong for fersk skrei. Her serverer vi den fantastiske råvaren på sydeuropeisk vis med ferske tomater, urter og hvitløk. Raskt, enkelt og utrolig godt! "
          />
          <RecipeThumbnail
            rating="3"
            description="Vi blir vel aldri lei av alt-i ett-gryter! Kylling cacciatore, som kan oversettes til jegerens kyllinggryte, er en slik deilig, varmende gryte som nesten gjør seg selv.  Server den med deilig ferskt brød for å få med hver dråpe av sausen."
          />
          <RecipeThumbnail />
          <RecipeThumbnail />
          <RecipeThumbnail />
          <RecipeThumbnail />
          <RecipeThumbnail />
        </div>
      </div>
    </div>
  );
}
