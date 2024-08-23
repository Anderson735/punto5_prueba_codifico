import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const dataMap = new Map();

export function getValues() {
    const input = document.getElementById('input');
    const value = input.value;
    const numberArray = value.split(',').map(Number);

    if (!validateInput(value)) {
        alert("Invalid input. Make sure to use only numbers and commas, without consecutive commas or commas at the beginning or end.");
        return;
    }

    dataMap.clear();

    numberArray.forEach((number, index) => {
        dataMap.set(String(index), number);
    });

    updateChart();
}

function validateInput(value) {
    const regex = /^([0-9]+)(,[0-9]+)*$/;
    return regex.test(value);
}

document.getElementById('btn-info').addEventListener('click', getValues);

const margin = { top: 20, right: 30, bottom: 40, left: 90 };
const width = 460 - margin.left - margin.right;
const height = 190 - margin.top - margin.bottom;

const svg = d3.select("#viewGrafic")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

function updateChart() {
    const data = Array.from(dataMap, ([key, value]) => ({ key, value }));

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .range([0, width]);

    const yScale = d3.scaleBand()
        .range([0, height])
        .domain(data.map(d => d.key))
        .padding(0.1);

    // Define a color scale to assign a unique color to each bar
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10)
        .domain(data.map(d => d.key));

    svg.selectAll("*").remove();

    svg.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", xScale(0))
        .attr("y", d => yScale(d.key))
        .attr("width", d => xScale(d.value))
        .attr("height", yScale.bandwidth())
        .attr("fill", d => colorScale(d.key));  // Assign a color from the scale

    svg.selectAll("text.label")
        .data(data)
        .join("text")
        .attr("class", "label")
        .attr("x", d => xScale(d.value) - 5)
        .attr("y", d => yScale(d.key) + yScale.bandwidth() / 2 + 4)
        .text(d => d.value)
        .style("fill", "#fff")
        .style("text-anchor", "end")
        .style("font-size", "12px");
}

// Call updateChart to render the initial chart
updateChart();
