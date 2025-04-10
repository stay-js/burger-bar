﻿using Desktop_Lib;
using System.Data;
using System.Net.Http;
using System.Windows;
using System.Windows.Controls;

namespace Desktop
{
    public partial class ReservationsPage : UserControl
    {
        private readonly MainWindow _mainWindow;

        private readonly string API_ENDPOINT = "/api/reservations";

        public ReservationsPage(MainWindow mainWindow)
        {
            InitializeComponent();
            _mainWindow = mainWindow;
            _ = LoadReservations();
        }

        private void BackToMainMenu_Click(object sender, RoutedEventArgs e) =>
            _mainWindow.GoBackToMainMenu();

        private async Task LoadReservations()
        {
            Reservations.Visibility = Visibility.Collapsed;
            Loading.Visibility = Visibility.Visible;

            try
            {
                var items = await _mainWindow
                    .ApiClient
                    .GetAsync<ReservationItem[]>(API_ENDPOINT);

                Reservations.ItemsSource = items;
            }
            catch (Exception ex)
            {
                MessageBoxHelper.Error(ex.Message);
            }

            Reservations.Visibility = Visibility.Visible;
            Loading.Visibility = Visibility.Collapsed;
        }

        private async void CreateButton_Click(object sender, RoutedEventArgs e)
        {
            var createDialog = new ModifyReservationDialog(null);

            if (createDialog.ShowDialog() == true)
            {
                var item = new CreateReservationItem(createDialog.Name.Text,
                    createDialog.Email.Text,
                    createDialog.PhoneNumber.Text,
                    $"{createDialog.Date.SelectedDate:yyyy.MM.dd} {createDialog.Time.Text}",
                    int.Parse(createDialog.People.Text));

                try
                {
                    await _mainWindow
                        .ApiClient
                        .PostPutPatchOrDeleteAsync(API_ENDPOINT, HttpMethod.Post, item);
                }
                catch (Exception ex)
                {
                    MessageBoxHelper.Error(ex.Message);
                }

                await LoadReservations();
            }
        }

        private async void ModifyButton_Click(object sender, RoutedEventArgs e)
        {
            if (Reservations.SelectedItems.Count == 0) return;
            if (Reservations.SelectedItems.Count > 1)
            {
                MessageBoxHelper.ModifyMoreThanOneWarning();
                return;
            }

            var selectedItem = (Reservations.SelectedItem as ReservationItem)!;

            var modifyDialog = new ModifyReservationDialog(selectedItem);

            if (modifyDialog.ShowDialog() == true)
            {
                var item = new ModifyReservationItem(selectedItem.ID,
                    modifyDialog.Name.Text,
                    modifyDialog.Email.Text,
                    modifyDialog.PhoneNumber.Text,
                    $"{modifyDialog.Date.SelectedDate:yyyy.MM.dd} {modifyDialog.Time.Text}",
                    int.Parse(modifyDialog.People.Text));

                try
                {
                    await _mainWindow
                        .ApiClient
                        .PostPutPatchOrDeleteAsync(API_ENDPOINT, HttpMethod.Patch, item);
                }
                catch (Exception ex)
                {
                    MessageBoxHelper.Error(ex.Message);
                }

                await LoadReservations();
            }
        }

        private async void DeleteButton_Click(object sender, RoutedEventArgs e)
        {
            if (Reservations.SelectedItems.Count == 0) return;

            var result = MessageBoxHelper.DeleteConfirmation();
            if (result == MessageBoxResult.No) return;

            var ids = Reservations.SelectedItems.Cast<ReservationItem>().Select(x => x.ID);

            try
            {
                await _mainWindow.ApiClient
                    .PostPutPatchOrDeleteAsync(API_ENDPOINT, HttpMethod.Delete, new IdsToDelete(ids));
            }
            catch (Exception ex)
            {
                MessageBoxHelper.Error(ex.Message);
            }

            await LoadReservations();
        }

        private async void RefreshButton_Click(object sender, RoutedEventArgs e) =>
            await LoadReservations();
    }
}
