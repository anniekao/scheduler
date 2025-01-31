import React from "react";
import axios from 'axios';

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId } from "@testing-library/react";

import Application from "components/Application/Application";
import { getByAltText, getByPlaceholderText, queryByText } from "@testing-library/dom";

afterEach(cleanup);

describe("Application", () => {
  // xit("renders without crashing", () => {
  //   render(<Application />);
  // });

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));
    
    fireEvent.click(getByText("Tuesday"));
    
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
   
  });

  // it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
  //    const { container, debug } = render(<Application />);

  //    await waitForElement(() => getByText(container, "Archie Cohen"));

  //    const appointments = getAllByTestId(container, "appointment");
  //    const appointment = appointments[0];

  //    fireEvent.click(getByAltText(appointment, "Add"));


  //    fireEvent.change(
  //      getByPlaceholderText(appointment, /enter student name/i),
  //      {
  //        target: { value: "Lydia Miller-Jones" }
  //      }
  //    );

  //    debug();

  //   //  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

  //   //  fireEvent.click(getByText(appointment, "Save"));

     

  //    console.log(prettyDOM(appointment));
  //   });

  // xit("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  //   const { container } = render(<Application />);

  //   await waitForElement(() => getByText(container, "Archie Cohen"));

  //   const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, 'Archie Cohen'));

  //   fireEvent.click(getByAltText(appointment, 'Delete'));
    
  //   expect(getByText(appointment, 'Delete the appointment?')).toBeInTheDocument();

  //   fireEvent.click(getByText(appointment, 'Confirm'));

  //   expect(getByText(container, 'Deleting')).toBeInTheDocument();

  //   waitForElement(() => getByAltText('Add'));
    
  //   const day = getAllByTestId(container, "day").find(day => {
  //     queryByText(day, 'Monday');
  //   });

  //   expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
  // });

  // xit("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
  //    const { container } = render(<Application />);

  //   await waitForElement(() => getByText(container, "Archie Cohen"));

  //   const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, 'Archie Cohen'));

  //   fireEvent.click(getByAltText(appointment, 'Edit'));
    
  //   fireEvent.change(
  //     getByPlaceholderText(appointment, /enter student name/i),
  //     {
  //       target: { value: "AAAA" }
  //     }
  //   );

  //   fireEvent.click(getByText(appointment, 'Save'));

  //   expect(getByText(appointment, 'Saving')).toBeInTheDocument();

  //   waitForElement(() => getByText(container, 'AAAA'));
  // });

  it("shows the save error when failing to save an appointment", () => {
     axios.put.mockRejectedValueOnce();
  });

  it("shows the delete error when failing to delete an existing appointment", () => {
    axios.delete.mockRejectedValueOnce();
  });
});