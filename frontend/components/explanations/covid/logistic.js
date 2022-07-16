
export default function CovidLogistic() {
 
  return (
    <div className="mb-2 pt-2 pb-2 h-full w-full">
      <div class="relative text-gray-500 text-lg mb-3 flex-auto">
        You can find more about Logistic Regression
        <a className="ml-1 text-blue-500" target="_blank" href="https://www.mastersindatascience.org/learning/introduction-to-machine-learning-algorithms/logistic-regression/">
          Here
        </a>
      </div>
      <div class="relative text-gray-500 text-lg flex-auto">
        We used spectral images for the classifier.
      </div>
      <div class="relative text-gray-500 text-lg flex-auto">
        You can look down to see some spectral images
      </div>
      <div class="relative text-gray-500 text-lg flex-auto">
        <img src="images/covidSpectograme.JPG"/>
        <img src="images/CovidSpec.JPG"/>
      </div>
      <div class="font-bold relative text-gray-500 text-lg flex-auto">
        Cross-validation was used to train the model.
      </div>
      <div class="ml-3 flot-left text-left relative text-gray-500 text-lg flex-auto">
        The dataset was split in this way:
        <ul>
          <li>80% for training.</li>
          <li>20% for testing.</li>
        </ul>
        <div class="font-bold">We evaluated the model on the testing set using the next metrics:</div>
        <ul>
          <li>Accuracy.</li>
          <li>Precision.</li>
          <li>Recall.</li>
          <li>FMeasure.</li>
        </ul>
        We repeated the process and evaluated it each time. We obtained the following confidence intervals:
        <ul>
          <li class="font-bold">Accuracy - (0.686, 0.731).</li>
          <li class="font-bold">Precision - (0.643, 0.702).</li>
          <li class="font-bold">Recall - (0.770, 0.884).</li>
          <li class="font-bold">FMeasure - (0.717, 0.760).</li>
        </ul>
        <div className='h-10'/>
      </div>
    </div>
  );
}
